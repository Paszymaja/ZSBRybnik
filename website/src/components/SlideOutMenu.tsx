import React, { useContext } from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext from "../stores/globalStore";
import OuterLink from "./SlideOutMenuOuterLink";
import SlideOutMenuHeightFixer from "./SlideOutMenuHeightFixer";

const SlideOutMenu = () => {
  const { isDarkThemeDispatcher, isSlideOutMenuOpenDispatcher, isMobileDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const [isSlideOutMenuOpen] = isSlideOutMenuOpenDispatcher;
  const [isMobile] = isMobileDispatcher;
  return (
    <SlideOutMenuWrapper isDarkTheme={isDarkTheme} isSlideOutMenuOpen={isSlideOutMenuOpen}>
      <SlideOutMenuHeightFixer isDarkTheme={isDarkTheme}>
        {isMobile === true ? <OuterLink title="Facebook" route="https://www.facebook.com/rybnikzsb/" /> : null}
        {isMobile === true ? <OuterLink title="Youtube" route="https://www.youtube.com/channel/UCMzNuGK3NB6CmNn-JlRvWww" /> : null}
      </SlideOutMenuHeightFixer>
    </SlideOutMenuWrapper>
  );
};

export default SlideOutMenu;