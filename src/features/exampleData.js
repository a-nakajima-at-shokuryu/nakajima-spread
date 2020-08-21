import { createSlice } from '@reduxjs/toolkit'; 
import { put, fork, takeLatest, call, select } from 'redux-saga/effects'; 

const name = 'exampleData';
const columns = Array(100).fill(0).map((_, i) => {
  const name = `column_${i}`;
  const title = `Column No.${i + 1}`;
  return {
    name, 
    title, 
  };
});
const initialState = {
  loading: false, 
  error: null, 
  columns, 
  data: [], 
};

export const slice = createSlice({
  name, 
  initialState, 
  reducers: {
    trigger: (state, action) => { 
      state.loading = true; 
    },
    success: (state, action) => {
      state.data = action.payload; 
    },  
    failure: (state, action) => {
      state.error = action.payload; 
    }, 
    fullfill: (state, action) => { 
      state.loading = false; 
    }, 
  }, 
});

export default slice; 

slice.selector = state => state[name];

slice.saga = function *() {
  yield fork(watchTrigger);
  yield put(slice.actions.trigger());
};
const watchTrigger = function *() {
  yield takeLatest(slice.actions.trigger, fetchDataSaga);
};
const fetchDataSaga = function *() {
  const { [name]: { columns } } = yield select();
  try {
    yield put(slice.actions.success(yield call(fetchData, columns)));
  } catch (error) {
    yield put(slice.actions.failure(error));
  } finally {
    yield put(slice.actions.fullfill());
  }
};
const fetchData = (columns) => {
  const data = Array(1000).fill(0).map((_, r) => {
    return columns.reduce((a, { name }, c) => {
      const value = `${r + 1} - ${c + 1}`;
      a[name] = value;
      return a;
    }, {});
  });
  return data; 
};