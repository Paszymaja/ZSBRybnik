import ReactGA from 'react-ga';

const subscribeGoogleAnalytics = (history: any) => {
  history.listen((location: { pathname: string }): void => {
    ReactGA.set({ page: `${location.pathname}${window.location.search}` });
    ReactGA.pageview(`${location.pathname}${window.location.search}`);
  });
}

export default subscribeGoogleAnalytics