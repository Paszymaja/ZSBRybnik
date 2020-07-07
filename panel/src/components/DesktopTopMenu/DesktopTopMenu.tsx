import React, { FC, useContext } from "react";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { iconSize } from "../../other/variables";
import {
  mdiHome,
  mdiWhiteBalanceSunny,
  mdiWeatherNight,
  mdiLogout,
} from "@mdi/js";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import DesktopTopMenuHeader from "./DesktopTopMenuHeader";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  IsAuthorizedDispatcher,
} from "../../contextes/globalContext";
import toggleDarkTheme from "../../other/toggleDarkTheme";
import scrollTop from "../../other/scrollTop";

interface DesktopTopMenuProps {}

const DesktopTopMenu: FC<DesktopTopMenuProps> = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();
  const { isDarkThemeDispatcher, isAuthorizedDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const [isDarkThemeLocal, setIsDarkThemeLocal]: IsDarkThemeDispatcher =
    isDarkThemeDispatcher;
  const [isAuthorized, setIsAuthorized]: IsAuthorizedDispatcher =
    isAuthorizedDispatcher;
  const colorThemeIcon: string = isDarkThemeLocal
    ? mdiWhiteBalanceSunny
    : mdiWeatherNight;
  const homeTitle: string = t("menu.home");
  const toDarkColorThemeTitle: string = t("menu.color-theme.to-dark");
  const toLightColorThemeTitle: string = t("menu.color-theme.to-light");
  const colorThemeTitle: string = isDarkThemeLocal
    ? toLightColorThemeTitle
    : toDarkColorThemeTitle;
  return (
    <DesktopTopMenuHeader isDarkTheme={isDarkThemeLocal}>
      {isAuthorized
        ? <Link
          to="/"
          title="Wyloguj się"
          onClick={() => {
            window.localStorage.removeItem("adminToken");
            setIsAuthorized(false);
          }}
        >
          <Icon
            path={mdiLogout}
            title="Wyloguj się"
            size={iconSize}
            color="#fff"
          />
        </Link>
        : null}
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
