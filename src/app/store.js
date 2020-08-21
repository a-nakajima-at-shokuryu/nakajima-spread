import { configureStore } from '@reduxjs/toolkit'; 
import { createLogger } from 'redux-logger'; 
import createSaga from 'redux-saga'; 
import { all, call, } from 'redux-saga/effects'; 
import exampleData from '../features/exampleData'; 

const reducer = {
  exampleData: exampleData.reducer, 
};
const logger = createLogger();
const saga = createSaga();
const middleware = [logger, saga];

const store = configureStore({
  reducer, 
  middleware, 
});

export default store; 

const sagas = {
  exampleData: call(exampleData.saga), 
};

store.runSaga = () => {
  saga.run(rootSaga);
}
const rootSaga = function *() {
  yield all(sagas);
}