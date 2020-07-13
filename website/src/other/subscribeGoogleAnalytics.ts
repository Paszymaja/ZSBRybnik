import ReactGA from "react-ga";

type SubscribeGoogleAnalytics = (history: History) => void;
type History = {
  listen: (callback: (location: { pathname: string }) => void) => void;
};

const subscribeGoogleAnalytics: SubscribeGoogleAnalytics = (
  history: History,
): void => {
  history.listen((location: { pathname: string }): void => {
    ReactGA.set({ page: `${location.pathname}${window.location.search}` });
    ReactGA.pageview(`${location.pathname}${window.location.search}`);
  });
};

export default subscribeGoogleAnalytics;
