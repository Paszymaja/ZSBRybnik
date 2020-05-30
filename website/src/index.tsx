import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import initTranslations from "./other/i18next";
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';
import consoleGreeting from './other/console-greeting';

ReactGA.initialize('UA-107728956-9');
ReactGA.pageview(window.location.pathname + window.location.search);

export const rootElement: HTMLElement | null = document.getElementById("root");

initTranslations();
consoleGreeting();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
