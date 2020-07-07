import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import initTranslations from "./other/i18next";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
import consoleGreeting from "./other/consoleGreeting";

type RootElement = HTMLElement | null;

ReactGA.initialize(process.env.REACT_APP_TRACKING_CODE as string);
ReactGA.pageview(window.location.pathname + window.location.search);

export const rootElement: RootElement = document.getElementById("root");

initTranslations();
consoleGreeting();

render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement,
);

serviceWorker.register();
