import React, { useState, useEffect } from "react";
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
import Push from "push.js";

type MountedUseEffect = () => void;
type OnlineHandler = (type: string) => void;
type ResizeLinstenerHandler = () => void;
type OnlineListenerHandler = (e: Event) => void;

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
  useEffect((): MountedUseEffect => {
    let timeout: NodeJS.Timeout;
    const resizeHandler = (): void => {
      const isMobile: boolean = window.innerWidth < 768 ? true : false;
      setIsMobileLocal(isMobile);
    };
    const onlineHandler: OnlineHandler = (type: string): void => {
      const fixedIsOnline: boolean = type === "online" ? true : false;
      setIsOnlineLocal(fixedIsOnline);
      const pushTitle: string = fixedIsOnline
        ? "O, widzę, że wróciłeś do żywych!"
        : "Twoje połączenie internetowe zostało zerwane 😭.";
      const pushMessage: string = fixedIsOnline
        ? "Teraz możesz znów spokojnie przeglądać treści online."
        : "Nie będziesz miał dostępu do wszystkich treści do póki nie staniesz się ponownie online.";
      Push.create(pushTitle, {
        body: pushMessage,
        icon: "/images/logo.webp",
      });
      if (fixedIsOnline) {
        window.location.reload();
      }
    };
    const resizeLinstenerHandler: ResizeLinstenerHandler = (): void => {
      clearTimeout(timeout);
      timeout = setTimeout(resizeHandler, 75);
    };
    const onlineListenerHandler: OnlineListenerHandler = (
      { type }: Event,
    ): void => onlineHandler(type);
    window.addEventListener("resize", resizeLinstenerHandler);
    window.addEventListener("online", onlineListenerHandler);
    window.addEventListener("offline", onlineListenerHandler);
    return (): void => {
      window.removeEventListener("resize", resizeLinstenerHandler);
      window.removeEventListener("online", onlineListenerHandler);
      window.removeEventListener("offline", onlineListenerHandler);
    };
  });
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
