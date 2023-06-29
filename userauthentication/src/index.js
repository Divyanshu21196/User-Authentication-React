import React from 'react';
import  ReactDOM  from "react-dom/client";
import App from "./App";
import { Provider } from './context/AuthContext';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { BrowserRouter } from 'react-router-dom';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)