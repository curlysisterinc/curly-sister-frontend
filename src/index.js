/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "./redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/errorBoundary";

const store = configureStore;

export const history = createBrowserHistory();

/** Here we setup React Redux and user Authentication to Signed In Users */
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  );
}

const Render = () => {
  ReactDOM.render(
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>,
    document.getElementById("root")
  );
};

Render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

const updateHandler = () => {
  // eslint-disable-next-line no-alert
  if (window.confirm("Update available. Do you want to reload?")) {
    window.location.reload(true);
  }
};

serviceWorkerRegistration.register({
  onupdate: updateHandler,
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
