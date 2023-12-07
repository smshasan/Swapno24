import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './app/store';

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_en from "./translations/en/common.json";
import common_bd from "./translations/bd/common.json";
import { GoogleOAuthProvider } from '@react-oauth/google';

i18next.init({
  whitelist: ['en', 'bd'],
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        bd: {
            common: common_bd
        },
    },
});





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
    <GoogleOAuthProvider clientId='1014577208458-1sjl2jcaqntovik3c3oknrkvrk62031k.apps.googleusercontent.com'>
      <App />
      </GoogleOAuthProvider>
    </I18nextProvider>
  </Provider>
)


