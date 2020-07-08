import React, {
  useContext,
  FC,
} from "react";
import SlideOutMenuWrapper from "./SlideOutMenuWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  IsSlideOutMenuOpenDispatcher,
} from "../../contextes/globalContext";
import SlideOutMenuHeightFixer from "./SlideOutMenuHeightFixer";
import InnerLink from "./SlideOutMenuInnerLink";

interface SlideOutMenuProps {}

const SlideOutMenu: FC<SlideOutMenuProps> = (): JSX.Element => {
  const {
    isDarkThemeDispatcher,
    isSlideOutMenuOpenDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isSlideOutMenuOpen]: IsSlideOutMenuOpenDispatcher =
    isSlideOutMenuOpenDispatcher;
  return (
    <SlideOutMenuWrapper
      isDarkTheme={isDarkTheme}
      isSlideOutMenuOpen={isSlideOutMenuOpen}
    >
      <SlideOutMenuHeightFixer isDarkTheme={isDarkTheme}>
      </SlideOutMenuHeightFixer>
    </SlideOutMenuWrapper>
  );
};

export default SlideOutMenu;
