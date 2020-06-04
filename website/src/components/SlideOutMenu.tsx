import React, { useContext, useState, useEffect } from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext from "../stores/globalStore";
import OuterLink from "./SlideOutMenuOuterLink";
import SlideOutMenuHeightFixer from "./SlideOutMenuHeightFixer";
import makeSubpagesRoutesRequest from "../other/makeSubpagesRoutesRequest";
import { useTranslation, UseTranslationResponse } from "react-i18next";

const SlideOutMenu = () => {
  const { isDarkThemeDispatcher, isSlideOutMenuOpenDispatcher, isMobileDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const [isSlideOutMenuOpen, setIsSlideOutMenuOpen] = isSlideOutMenuOpenDispatcher;
  const [isMobile] = isMobileDispatcher;
  const [routes, setRoutes] = useState([] as JSX.Element[]);
  const [isMounted, setIsMounted] = useState(false);
  const { t }: UseTranslationResponse = useTranslation();
  useEffect(() => {
    if (!isMounted) {
      makeSubpagesRoutesRequest(setRoutes, setIsSlideOutMenuOpen, t);
    }
    setIsMounted(true);
  }, [isMounted, setIsMounted, t, setRoutes, setIsSlideOutMenuOpen])
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