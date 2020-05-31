import React, { useContext } from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext from "../stores/globalStore";

const SlideOutMenu = () => {
  const { isDarkThemeDispatcher, isSlideOutMenuOpenDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const [isSlideOutMenuOpen] = isSlideOutMenuOpenDispatcher;
  return (
    <SlideOutMenuWrapper isDarkTheme={isDarkTheme} isSlideOutMenuOpen={isSlideOutMenuOpen}></SlideOutMenuWrapper>
  );
};

export default SlideOutMenu;