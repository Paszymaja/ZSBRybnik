import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import initTranslations from "./other/i18next";

type RootElement = HTMLElement | null;

export const rootElement: RootElement = document.getElementById("root");

initTranslations();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement,
);

serviceWorker.register();
