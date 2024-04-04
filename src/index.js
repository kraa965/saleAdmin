import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root_leader'));
root.render(

  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>

);


