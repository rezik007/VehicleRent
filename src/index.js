import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

//Main component that is rendered to '#root' element in index.html
//it's renderign the whole component where BrowserRouter is used

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
