import React from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized'; 
import styled from 'styled-components'; 
import ArrowKeyStepper from 'react-virtualized/dist/commonjs/ArrowKeyStepper';

const Spread = ({
  columns = [], 
  data = [], 
}) => {
  const rows = data;
  const cols = columns; 
  const rowCount = rows.length + 1;
  const columnCount = cols.length + 1;
  const fixedRowCount = 1; 
  const fixedColumnCount = 1; 
  const rowHeight = 20;
  const columnWidth = ({ index }) => index === 0 ? 40 : 100;
  // for AutoKeyStepper 
  const [scrollToRow, setScrollToRow] = React.useState(1);
  const [scrollToColumn, setScrollToColumn] = React.useState(1);
  const mode = 'cells';
  const isControlled = true; 
  const onScrollToChange = ({ scrollToRow, scrollToColumn }) => {
    selectCell(scrollToRow, scrollToColumn);
  }
  const selectCell = (row, col) => {
    setScrollToRow(row);
    setScrollToColumn(col);
  };
  const cellRenderer = ({ rowIndex: r, columnIndex: c, key, style }) => {
    r--;
    c--;
    let value;
    if (r < 0 && c < 0) {
      value = 'No.';
    } else if (c < 0) {
      value = r.toString();
    } else if (r < 0) {
      value = cols[c].title; 
    } else {
      value = rows[r][cols[c].name]
    }
    let Cell = BodyCell;
    if (c < 0) {
      Cell = RowHeaderCell;
    } else if (r < 0) {
      Cell = HeaderCell; 
    } else if (r === scrollToRow - 1 && c === scrollToColumn - 1) {
      Cell = SelectedCell;
    }
    return (
      <Cell key={key} style={style} onClick={() => selectCell(r + 1, c + 1)}>
        {value}
      </Cell>
    );
  };
  
  return (
    <Wrapper>
      <AutoSizer>
        {({width, height}) => (
          <ArrowKeyStepper
            rowCount={rowCount}
            columnCount={columnCount}
            mode={mode}
            isControlled={isControlled}
            scrollToRow={scrollToRow}
            scrollToColumn={scrollToColumn}
            onScrollToChange={onScrollToChange}
          >
            {({onSectionRendered, scrollToRow, scrollToColumn}) => (
              <MultiGrid 
                width={width}
                height={height}
                rowCount={rowCount}
                columnCount={columnCount}
                fixedRowCount={fixedRowCount}
                fixedColumnCount={fixedColumnCount}
                rowHeight={rowHeight}
                columnWidth={columnWidth}
                cellRenderer={cellRenderer}
                scrollToRow={scrollToRow}
                scrollToColumn={scrollToColumn}
                onSectionRendered={onSectionRendered}
                
              />
            )}
          </ArrowKeyStepper>
        )}
      </AutoSizer>
    </Wrapper>
  )
}

export default Spread;

const Wrapper = styled.div`
  height: 100vh; 
`;
const Cell = styled.div`
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center; 
  padding: 0 3px; 
`;  
const HeaderCell = styled(Cell)`
  background: #ccc;
  border-color: #fff;
  font-weight: bold; 
`;
const RowHeaderCell = styled(HeaderCell)`
  justify-content: flex-end; 
`;
const BodyCell = styled(Cell)``;
const SelectedCell = styled(BodyCell)`
  background: #ddd;
`;