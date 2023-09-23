import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './app/store';

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_en from "./translations/en/common.json";
import common_bd from "./translations/bd/common.json";

i18next.init({
  whitelist: ['en', 'bd'],
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'bd',                              // language to use
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
      <App />
    </I18nextProvider>
  </Provider>
)


