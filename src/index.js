import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Providers from './providers/Providers';
import AppData from './AppData';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <AppData />
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
  );
  
  