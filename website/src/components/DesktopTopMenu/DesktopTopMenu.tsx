import React, { FC, useContext } from "react";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { iconSize } from "../../other/variables";
import {
  mdiTableSearch,
  mdiBookOpenPageVariant,
  mdiHome,
  mdiFacebook,
  mdiYoutube,
  mdiWhiteBalanceSunny,
  mdiWeatherNight,
} from "@mdi/js";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import DesktopTopMenuHeader from "./DesktopTopMenuHeader";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";
import toggleDarkTheme from "../../other/toggleDarkTheme";
import scrollTop from "../../other/scrollTop";

interface DesktopTopMenuProps {}

const DesktopTopMenu: FC<DesktopTopMenuProps> = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkThemeLocal, setIsDarkThemeLocal]: IsDarkThemeDispatcher =
    isDarkThemeDispatcher;
  const colorThemeIcon: string = isDarkThemeLocal
    ? mdiWhiteBalanceSunny
    : mdiWeatherNight;
  const facebookTitle: string = t("menu.facebook");
  const youtubeTitle: string = t("menu.youtube");
  const vulcanTitle: string = t("menu.vulcan");
  const lessonPlanTitle: string = t("menu.lesson-plan");
  const homeTitle: string = t("menu.home");
  const toDarkColorThemeTitle: string = t("menu.color-theme.to-dark");
  const toLightColorThemeTitle: string = t("menu.color-theme.to-light");
  const colorThemeTitle: string = isDarkThemeLocal
    ? toLightColorThemeTitle
    : toDarkColorThemeTitle;
  return (
    <DesktopTopMenuHeader isDarkTheme={isDarkThemeLocal}>
      <a
        rel="noopener noreferrer"
        href="https://www.youtube.com/channel/UCMzNuGK3NB6CmNn-JlRvWww"
        aria-label={youtubeTitle}
        title={youtubeTitle}
      >
        <Icon
          path={mdiYoutube}
          title={youtubeTitle}
          aria-label={youtubeTitle}
          size={iconSize}
          color="#fff"
        />
      </a>
      <a
        rel="noopener noreferrer"
        href="https://www.facebook.com/rybnikzsb/"
        title={facebookTitle}
        aria-label={facebookTitle}
      >
        <Icon
          path={mdiFacebook}
          title={facebookTitle}
          aria-label={facebookTitle}
          size={iconSize}
          color="#fff"
        />
      </a>
      <div
        title={colorThemeTitle}
        aria-label={colorThemeTitle}
        onClick={(): void =>
          toggleDarkTheme(isDarkThemeLocal, setIsDarkThemeLocal)}
      >
        <Icon
          path={colorThemeIcon}
          title={colorThemeTitle}
          aria-label={colorThemeTitle}
          size={iconSize}
          color="#fff"
        />
      </div>
      <a
        rel="noopener noreferrer"
        href="https://uonetplus.vulcan.net.pl/rybnik"
        title={vulcanTitle}
        aria-label={vulcanTitle}
      >
        <Icon
          path={mdiBookOpenPageVariant}
          title={vulcanTitle}
          aria-label={vulcanTitle}
          size={iconSize}
          color="#fff"
        />
      </a>
      <a
        rel="noopener noreferrer"
        href="https://planlekcjizsb.snowdropcurvemaster.now.sh/"
        title={lessonPlanTitle}
        aria-label={lessonPlanTitle}
      >
        <Icon
          path={mdiTableSearch}
          title={lessonPlanTitle}
          aria-label={lessonPlanTitle}
          size={iconSize}
          color="#fff"
        />
      </a>
      <Link
        to="/"
        title={homeTitle}
        aria-label={homeTitle}
        onClick={(): void => scrollTop()}
      >
        <Icon
          path={mdiHome}
          aria-label={homeTitle}
          title={homeTitle}
          size={iconSize}
          color="#fff"
        />
      </Link>
    </DesktopTopMenuHeader>
  );
};

export default DesktopTopMenu;
