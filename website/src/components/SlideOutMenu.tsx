import React, { useContext, useState, useEffect } from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext from "../stores/globalStore";
import OuterLink from "./SlideOutMenuOuterLink";
import SlideOutMenuHeightFixer from "./SlideOutMenuHeightFixer";
import { useTranslation } from "react-i18next";
import InnerLink from "./SlideOutMenuInnerLink";

const SlideOutMenu = () => {
  const { isDarkThemeDispatcher, isSlideOutMenuOpenDispatcher, isMobileDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const [isSlideOutMenuOpen] = isSlideOutMenuOpenDispatcher;
  const [isMobile] = isMobileDispatcher;
  const [routes, setRoutes] = useState([] as JSX.Element[]);
  const { t } = useTranslation();
  const makeSubpagesOptionsRequest = (): void => {
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
          const title = t(`pages.${item.route}-page`);
          return <InnerLink route={route} title={title} key={key} />;
        });
        setRoutes(routesTemp);
      } catch (err) {
        controller.abort();
        setTimeout(tryRequest, 100);
      }
    }
    tryRequest();
  };
  useEffect(() => {
    makeSubpagesOptionsRequest();
  }, []);
  return (
    <SlideOutMenuWrapper isDarkTheme={isDarkTheme} isSlideOutMenuOpen={isSlideOutMenuOpen}>
      <SlideOutMenuHeightFixer isDarkTheme={isDarkTheme}>
        {routes}
        {isMobile === true ? <OuterLink title="Facebook" route="https://www.facebook.com/rybnikzsb/" /> : null}
        {isMobile === true ? <OuterLink title="Youtube" route="https://www.youtube.com/channel/UCMzNuGK3NB6CmNn-JlRvWww" /> : null}
      </SlideOutMenuHeightFixer>
    </SlideOutMenuWrapper>
  );
};

export default SlideOutMenu;