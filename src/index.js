import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// import reportWebVitals from './reportWebVitals';
//LOGIN
import { Auth0Provider } from '@auth0/auth0-react';
//LOGIN
import { authCredentials } from './auth';
import { Provider } from 'react-redux';
import store from './redux/store';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Auth0Provider
    domain={authCredentials.domain}
    clientId={authCredentials.clientId}
    redirectUri={window.location.origin}
    audience={authCredentials.audience}
    >
      <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

