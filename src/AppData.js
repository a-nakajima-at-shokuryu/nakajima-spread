import React from 'react';
import store from './app/store'; 

const AppData = () => {
  React.useEffect(() => {
    store.runSaga();
  }, []);
  return null;
}

export default AppData
