import React from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './app/store';

import LocationContextProvider from './components/context.js/LocationContext';

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import common_en from "./translations/en/common.json";
import common_bd from "./translations/bd/common.json";
import { GoogleOAuthProvider } from '@react-oauth/google';


i18next.init({
  whitelist: ['English', 'Bangla'],
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'English',                              // language to use
  resources: {
    English: {
      common: common_en               // 'common' is our custom namespace
    },
    Bangla: {
      common: common_bd
    },
  },
});


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}


// const root = ReactDOM.createRoot(document.getElementById('root'));
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      {/* <ErrorBoundary> */}
      <GoogleOAuthProvider clientId='1014577208458-1sjl2jcaqntovik3c3oknrkvrk62031k.apps.googleusercontent.com'>
        <LocationContextProvider>
          <App />
        </LocationContextProvider>


      </GoogleOAuthProvider>
      {/* </ErrorBoundary> */}
    </I18nextProvider>
  </Provider>
)


