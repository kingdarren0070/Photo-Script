import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { MainProvider } from './components/context/MainContext';

ReactDOM.render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
