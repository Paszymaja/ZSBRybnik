import React, { Dispatch, SetStateAction } from "react";
import InnerLink from "../components/SlideOutMenuInnerLink";

type setRoutes = Dispatch<SetStateAction<JSX.Element[]>>

const makeSubpagesRoutesRequest = (setRoutes: setRoutes): void => {
  const controller: AbortController = new AbortController();
  const signal: AbortSignal = controller.signal;
  const tryRequest = async (): Promise<void> => {
    try {
      const res: Response = await fetch(`http://${window.location.hostname}:5002/api/get-subpages-routes`, {
        method: 'GET',
        signal: signal
      });
      const data = await res.json();
      const routesTemp = data.map((item: { route: string }, key: number) => {
        const route = `/subpage?route=${item.route}`;
        //const title = t(`pages.${item.route}-page`);
        return <InnerLink route={route} title={route} key={key} />;
      });
      setRoutes(routesTemp);
    } catch (err) {
      controller.abort();
      setTimeout(tryRequest, 100);
    }
  }
  tryRequest();
};

export default makeSubpagesRoutesRequest;