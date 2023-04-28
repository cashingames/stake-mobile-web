import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store } from './store'
import reportWebVitals from './reportWebVitals';
import './index.css';
import { initFacebookSdk } from './initFacebookSdk';

//temporary fix for service worker
navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister()
  }
}).catch(function (err) {
  console.log('Service Worker registration failed: ', err);
});

initFacebookSdk().then(console.log('initialized'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();