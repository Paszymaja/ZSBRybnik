import React, { useState } from "react";
import {
  GlobalContextProvider,
  IsDarkThemeDispatcher,
  GlobalContextValues,
  initialGlobalStoreValue,
  IsMobileDispatcher,
  IsSlideOutMenuOpenDispatcher,
  IsOnlineDispatcher,
  LanguageDispatcher,
} from "./contextes/globalContext";

const {
  isDarkTheme,
  isMobile,
  isSlideOutMenuOpen,
  isOnline,
  language,
}: GlobalContextValues = initialGlobalStoreValue;

const App = () => {
  const [isDarkThemeLocal, setIsDarkThemeLocal]: IsDarkThemeDispatcher =
    useState(isDarkTheme);
  const [isMobileLocal, setIsMobileLocal]: IsMobileDispatcher = useState(
    isMobile,
  );
  const [isSlideOutMenuOpenLocal, setIsSlideOutMenuOpenLocal]:
    IsSlideOutMenuOpenDispatcher = useState(isSlideOutMenuOpen);
  const [isOnlineLocal, setIsOnlineLocal]: IsOnlineDispatcher = useState(
    isOnline,
  );
  const [languageLocal, setLanguageLocal]: LanguageDispatcher = useState(
    language,
  );
  return (
    <GlobalContextProvider
      value={{
        isDarkThemeDispatcher: [isDarkThemeLocal, setIsDarkThemeLocal],
        isMobileDispatcher: [isMobileLocal, setIsMobileLocal],
        isSlideOutMenuOpenDispatcher: [
          isSlideOutMenuOpenLocal,
          setIsSlideOutMenuOpenLocal,
        ],
        isOnlineDispatcher: [isOnlineLocal, setIsOnlineLocal],
        languageDispatcher: [languageLocal, setLanguageLocal],
      }}
    >
    </GlobalContextProvider>
  );
};

export default App;
