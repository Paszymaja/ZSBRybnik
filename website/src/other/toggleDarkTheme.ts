import { Dispatch, SetStateAction } from "react";

type ToggleDarkTheme = (
  isDarkThemeLocal: boolean,
  setIsDarkThemeLocal: Dispatch<SetStateAction<boolean>>,
) => void;

const toggleDarkTheme: ToggleDarkTheme = (
  isDarkThemeLocal: boolean,
  setIsDarkThemeLocal: Dispatch<SetStateAction<boolean>>,
): void => {
  isDarkThemeLocal
    ? window.localStorage.removeItem("isDarkTheme")
    : window.localStorage.setItem("isDarkTheme", "true");
  setIsDarkThemeLocal(!isDarkThemeLocal);
};

export default toggleDarkTheme;
