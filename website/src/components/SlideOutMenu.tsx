import React, { useContext, useState, useEffect } from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext from "../stores/globalStore";
import OuterLink from "./SlideOutMenuOuterLink";
import SlideOutMenuHeightFixer from "./SlideOutMenuHeightFixer";
import scrollTop from "../other/scrollTop";
import InnerLink from "./SlideOutMenuInnerLink";

type TryRequest = () => Promise<void>;
type ResData = { route: string; title: string };

const SlideOutMenu = () => {
  const {
    isDarkThemeDispatcher,
    isSlideOutMenuOpenDispatcher,
    isMobileDispatcher,
    languageDispatcher,
  } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const [isSlideOutMenuOpen, setIsSlideOutMenuOpen] =
    isSlideOutMenuOpenDispatcher;
  const [isMobile] = isMobileDispatcher;
  const [language] = languageDispatcher;
  const [routes, setRoutes] = useState([] as JSX.Element[]);
  useEffect(() => {
    const controller: AbortController = new AbortController();
    const signal: AbortSignal = controller.signal;
    const tryRequest: TryRequest = async (): Promise<void> => {
      try {
        const res: Response = await fetch(
          `http://${window.location.hostname}:5002/api/get-subpages-routes?language=${language}`,
          {
            method: "GET",
            signal: signal,
          },
        );
        const data: ResData[] = await res.json();
        const routesTemp: JSX.Element[] = data.map(
          (
            { route, title }: ResData,
            key: number,
          ): JSX.Element => {
            const fixedRoute: string =
              `/subpage?route=${route}&language=${language}`;
            return <InnerLink
              route={fixedRoute}
              title={title}
              key={key}
              onClick={(): void => {
                scrollTop();
                setIsSlideOutMenuOpen(false);
              }}
            />;
          },
        );
        setRoutes(routesTemp);
      } catch (err) {
        controller.abort();
      }
    };
    tryRequest();
  }, [setRoutes, setIsSlideOutMenuOpen, language]);
  return (
    <SlideOutMenuWrapper
      isDarkTheme={isDarkTheme}
      isSlideOutMenuOpen={isSlideOutMenuOpen}
    >
      <SlideOutMenuHeightFixer isDarkTheme={isDarkTheme}>
        {routes}
        {isMobile === true
          ? <OuterLink
            title="Facebook"
            route="https://www.facebook.com/rybnikzsb/"
          />
          : null}
        {isMobile === true
          ? <OuterLink
            title="Youtube"
            route="https://www.youtube.com/channel/UCMzNuGK3NB6CmNn-JlRvWww"
          />
          : null}
      </SlideOutMenuHeightFixer>
    </SlideOutMenuWrapper>
  );
};

export default SlideOutMenu;
