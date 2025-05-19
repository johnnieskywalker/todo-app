import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'inversify-react';
import container from './container';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider container={container}>
      <App />
    </Provider>
  </React.StrictMode>
);
