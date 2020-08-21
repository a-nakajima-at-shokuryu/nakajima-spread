import React from 'react';
import { useSelector } from 'react-redux'; 
import exampleData from './features/exampleData';
import Spread from './components/Spread';

const App = () => {
  const { columns, data } = useSelector(exampleData.selector);
  return (
    <Spread columns={columns} data={data} />
  )
}

export default App
