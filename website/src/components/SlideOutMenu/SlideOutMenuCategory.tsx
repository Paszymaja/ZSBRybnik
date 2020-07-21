import React, {
  FC,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsMobileDispatcher,
  IsDarkThemeDispatcher,
  IsSlideOutMenuOpenDispatcher,
} from "../../contextes/globalContext";
import { mdiArrowDown, mdiArrowUp } from "@mdi/js";
import Icon from "@mdi/react";
import { iconSize } from "../../other/variables";
import SlideOutMenuCategoryWrapper from "./SlideOutMenuCategoryWrapper";
import SlideOutMenuCategoryChildrenWrapper from "./SlideOutMenuCategoryChildrenWrapper";

interface SlideOutMenuCategoryProps {
  title: string;
  onlyForMobile?: boolean;
  children: ReactNode;
}

const SlideOutMenuCategory: FC<SlideOutMenuCategoryProps> = (
  { title, onlyForMobile, children }: SlideOutMenuCategoryProps,
): JSX.Element => {
  const {
    isMobileDispatcher,
    isDarkThemeDispatcher,
    isSlideOutMenuOpenDispatcher,
  }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isSlideOutMenuOpen]: IsSlideOutMenuOpenDispatcher =
    isSlideOutMenuOpenDispatcher;
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    if (!isSlideOutMenuOpen) {
      setIsHidden(true);
    }
  }, [isSlideOutMenuOpen]);
  return (
    <>
      {(onlyForMobile && isMobile) || !onlyForMobile
        ? <>
          <SlideOutMenuCategoryWrapper
            isDarkTheme={isDarkTheme}
            onClick={(): void => setIsHidden(!isHidden)}
            title={title}
            aria-label={title}
          >
            {title}
            <Icon path={isHidden ? mdiArrowDown : mdiArrowUp} size={iconSize} />
          </SlideOutMenuCategoryWrapper>
          {!isHidden
            ? <SlideOutMenuCategoryChildrenWrapper isHidden={isHidden}>
              {children}
            </SlideOutMenuCategoryChildrenWrapper>
            : null}
        </>
        : null}
    </>
  );
};

export default SlideOutMenuCategory;
