import { Dispatch, SetStateAction } from "react";

const toggleDarkTheme = (isDarkThemeLocal: boolean, setIsDarkThemeLocal: Dispatch<SetStateAction<boolean>>): void => {
  isDarkThemeLocal ? window.localStorage.removeItem("isDarkTheme") : window.localStorage.setItem("isDarkTheme", "true");
  setIsDarkThemeLocal(!isDarkThemeLocal);
};

export default toggleDarkTheme;