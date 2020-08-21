import React from 'react';
import ReduxProvider from './ReduxProvider';

const providers = [
  ReduxProvider, 
];

const Providers = ({
  children, 
}) => {
  return providers.reduce((children, Provider) => (
    <Provider>
      {children}
    </Provider>
  ), children);
}

export default Providers
