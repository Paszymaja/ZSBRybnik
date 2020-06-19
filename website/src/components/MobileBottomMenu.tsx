import React, { useContext } from "react";
import MobileBottomMenuWrapper from "./MobileBottomMenuWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../stores/globalStore";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiBookOpenPageVariant, mdiHome, mdiTableSearch } from "@mdi/js";
import { iconSize } from "../other/variables";
import { useTranslation, UseTranslationResponse } from "react-i18next";

const MobileBottomMenu = () => {
  const { t }: UseTranslationResponse = useTranslation();
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
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
      <Link to="/" title={homeTitle} aria-label={homeTitle}>
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
