import ReactGA from "react-ga";

type SubscribeGoogleAnalytics = (history: any) => void;

const subscribeGoogleAnalytics: SubscribeGoogleAnalytics = (
  history: any,
): void => {
  history.listen((location: { pathname: string }): void => {
    ReactGA.set({ page: `${location.pathname}${window.location.search}` });
    ReactGA.pageview(`${location.pathname}${window.location.search}`);
  });
};

export default subscribeGoogleAnalytics;
