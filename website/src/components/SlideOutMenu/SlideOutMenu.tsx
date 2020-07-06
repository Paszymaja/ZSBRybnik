import React, {
  useContext,
  useState,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  IsSlideOutMenuOpenDispatcher,
  IsMobileDispatcher,
  LanguageDispatcher,
} from "../../contextes/globalContext";
import OuterLink from "./SlideOutMenuOuterLink";
import SlideOutMenuHeightFixer from "./SlideOutMenuHeightFixer";
import InnerLink from "./SlideOutMenuInnerLink";

interface SlideOutMenuProps {}

type TryRequest = () => Promise<void>;
type ResData = { route: string; title: string; onlyForMobile: boolean };
type RoutesDispatcher = [
  JSX.Element[],
  Dispatch<SetStateAction<JSX.Element[]>>,
];

const SlideOutMenu: FC<SlideOutMenuProps> = (): JSX.Element => {
  const {
    isDarkThemeDispatcher,
    isSlideOutMenuOpenDispatcher,
    isMobileDispatcher,
    languageDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isSlideOutMenuOpen]: IsSlideOutMenuOpenDispatcher =
    isSlideOutMenuOpenDispatcher;
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  const [language]: LanguageDispatcher = languageDispatcher;
  const [routes, setRoutes]: RoutesDispatcher = useState([] as JSX.Element[]);
  useEffect((): void => {
    const controller: AbortController = new AbortController();
    const signal: AbortSignal = controller.signal;
    const tryRequest: TryRequest = async (): Promise<void> => {
      try {
        const res: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-subpages-routes?language=${language}`,
          {
            method: "GET",
            signal: signal,
          },
        );
        const data: ResData[] = await res.json();
        const routesTemp: JSX.Element[] = data.map(
          (
            { route, title, onlyForMobile }: ResData,
            key: number,
          ): JSX.Element => {
            const fixedRoute: string = `/subpage?route=${route}`;
            return <InnerLink
              route={fixedRoute}
              title={title}
              onlyForMobile={onlyForMobile}
              key={key}
            />;
          },
        );
        setRoutes(routesTemp);
      } catch (err) {
        controller.abort();
      }
    };
    tryRequest();
  }, [setRoutes, language]);
  return (
    <SlideOutMenuWrapper
      isDarkTheme={isDarkTheme}
      isSlideOutMenuOpen={isSlideOutMenuOpen}
    >
      <SlideOutMenuHeightFixer isDarkTheme={isDarkTheme}>
        {routes}
        {isMobile
          ? <>
            <OuterLink
              title="Facebook"
              route="https://www.facebook.com/rybnikzsb/"
            />
            <OuterLink
              title="Youtube"
              route="https://www.youtube.com/channel/UCMzNuGK3NB6CmNn-JlRvWww"
            />
          </>
          : null}
      </SlideOutMenuHeightFixer>
    </SlideOutMenuWrapper>
  );
};

export default SlideOutMenu;
