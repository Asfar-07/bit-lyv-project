import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./features/components.css"
import {Provider} from "react-redux"
import ReduxStore from './redux/ReduxStore';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
    <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
