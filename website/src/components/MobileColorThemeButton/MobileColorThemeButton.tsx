import React, { FC, useContext } from "react";
import MobileColorThemeButtonWrapper from "./MobileColorThemeButtonWrapper";
import Icon from "@mdi/react";
import GlobalContext from "../../contextes/globalContext";
import { mdiWhiteBalanceSunny, mdiWeatherNight } from "@mdi/js";
import { iconSize } from "../../other/variables";

interface MobileColorThemeButtonProps {}

const MobileColorThemeButton: FC<MobileColorThemeButtonProps> =
  (): JSX.Element => {
    const { isDarkThemeDispatcher } = useContext(GlobalContext);
    const [isDarkTheme, setIsDarkTheme] = isDarkThemeDispatcher;
    const icon: string = isDarkTheme ? mdiWhiteBalanceSunny : mdiWeatherNight;
    return (
      <MobileColorThemeButtonWrapper
        onClick={(): void => setIsDarkTheme(!isDarkTheme)}
      >
        <Icon path={icon} title="Go dark" size={iconSize} color="#fff" />
      </MobileColorThemeButtonWrapper>
    );
  };

export default MobileColorThemeButton;
