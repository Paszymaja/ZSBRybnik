import React, { Dispatch, SetStateAction } from 'react';
import InnerLink from '../components/SlideOutMenuInnerLink';
import { TFunction } from 'i18next';
import scrollTop from './scrollTop';

type SetRoutes = Dispatch<SetStateAction<JSX.Element[]>>;
type ResData = { route: string, isTitleTranslated: boolean, title: string };
type MakeSubpagesRoutesRequest = (setRoutes: SetRoutes, setIsSlideOutMenuOpen: Dispatch<SetStateAction<boolean>>, translationFunction: TFunction) => void;
type TryRequest = () => Promise<void>;

const makeSubpagesRoutesRequest: MakeSubpagesRoutesRequest = (setRoutes: SetRoutes, setIsSlideOutMenuOpen: Dispatch<SetStateAction<boolean>>, translationFunction: TFunction): void => {
  const controller: AbortController = new AbortController();
  const signal: AbortSignal = controller.signal;
  const tryRequest: TryRequest = async (): Promise<void> => {
    try {
      const res: Response = await fetch(`http://${window.location.hostname}:5002/api/get-subpages-routes`, {
        method: 'GET',
        signal: signal
      });
      const data: ResData[] = await res.json();
      const routesTemp: JSX.Element[] = data.map(({ route, title, isTitleTranslated }: ResData, key: number): JSX.Element => {
        const fixedRoute: string = `/subpage?route=${route}`;
        const fixedTitle = isTitleTranslated ? translationFunction(`pages.${title}`) : title;
        return <InnerLink route={fixedRoute} title={fixedTitle} key={key} onClick={(): void => {
          scrollTop();
          setIsSlideOutMenuOpen(false)
        }} />;
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