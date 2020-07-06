import React, { useContext, FC } from "react";
import MobileBottomMenuWrapper from "./MobileBottomMenuWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  IsSlideOutMenuOpenDispatcher,
} from "../../contextes/globalContext";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiBookOpenPageVariant, mdiHome, mdiTableSearch } from "@mdi/js";
import { iconSize } from "../../other/variables";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import scrollTop from "../../other/scrollTop";

interface MobileBottomMenuProps {}

const MobileBottomMenu: FC<MobileBottomMenuProps> = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();
  const { isDarkThemeDispatcher, isSlideOutMenuOpenDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [, setIsSlideOutMenuOpen]: IsSlideOutMenuOpenDispatcher =
    isSlideOutMenuOpenDispatcher;
  const homeTitle: string = t("menu.home");
  const vulcanTitle: string = t("menu.vulcan");
  const lessonPlanTitle: string = t("menu.lesson-plan");
  return (
    <MobileBottomMenuWrapper isDarkTheme={isDarkTheme}>
      <a
        rel="noopener noreferrer"
        title={vulcanTitle}
        aria-label={vulcanTitle}
        href="https://uonetplus.vulcan.net.pl/rybnik"
      >
        <Icon
          title={vulcanTitle}
          aria-label={vulcanTitle}
          path={mdiBookOpenPageVariant}
          size={iconSize}
          color="#fff"
        />
      </a>
      <Link
        to="/"
        title={homeTitle}
        aria-label={homeTitle}
        onClick={(): void => {
          scrollTop();
          setIsSlideOutMenuOpen(false);
        }}
      >
        <Icon
          path={mdiHome}
          title={homeTitle}
          aria-label={homeTitle}
          size={iconSize}
          color="#fff"
        />
      </Link>
      <a
        title={lessonPlanTitle}
        aria-label={lessonPlanTitle}
        rel="noopener noreferrer"
        href="https://planlekcjizsb.snowdropcurvemaster.now.sh"
      >
        <Icon
          title={lessonPlanTitle}
          aria-label={lessonPlanTitle}
          path={mdiTableSearch}
          size={iconSize}
          color="#fff"
        />
      </a>
    </MobileBottomMenuWrapper>
  );
};

export default MobileBottomMenu;
