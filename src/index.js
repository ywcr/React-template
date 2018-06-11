import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route
  } from 'react-router-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>  
      <App /> 
    </BrowserRouter>
  </Provider> , document.getElementById('root'));
registerServiceWorker();