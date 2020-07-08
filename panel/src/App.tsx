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
  TitleDispatcher,
  IsAuthorizedDispatcher,
} from "./contextes/globalContext";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import Push from "push.js";
import GlobalStyle from "./components/GlobalStyle";
import Overlay from "./components/Overlay";
import MobileUpsideMenu from "./components/MobileUpsideMenu/MobileUpsideMenu";
import DesktopTopMenu from "./components/DesktopTopMenu/DesktopTopMenu";
import SlideOutMenuButton from "./components/SlideOutMenu/SlideOutMenuButton";
import SlideOutMenu from "./components/SlideOutMenu/SlideOutMenu";
import MobileColorThemeButton from "./components/MobileColorThemeButton/MobileColorThemeButton";

type MountedUseEffect = () => void;
type OnlineHandler = (type: string) => void;
type ResizeLinstenerHandler = () => void;
type OnlineListenerHandler = (e: Event) => void;

const {
  isDarkTheme,
  isMobile,
  isSlideOutMenuOpen,
  isOnline,
  title,
  language,
  isAuthorized,
}: GlobalContextValues = initialGlobalStoreValue;

const App = () => {
  const [isDarkThemeLocal, setIsDarkThemeLocal]: IsDarkThemeDispatcher =
    useState(isDarkTheme);
  const [isAuthorizedLocal, setIsAuthorizedLocal]: IsAuthorizedDispatcher =
    useState(isAuthorized);
  const [isMobileLocal, setIsMobileLocal]: IsMobileDispatcher = useState(
    isMobile,
  );
  const [titleLocal, setTitleLocal]: TitleDispatcher = useState(title);
  const [isSlideOutMenuOpenLocal, setIsSlideOutMenuOpenLocal]:
    IsSlideOutMenuOpenDispatcher = useState(isSlideOutMenuOpen);
  const [isOnlineLocal, setIsOnlineLocal]: IsOnlineDispatcher = useState(
    isOnline,
  );
  const [languageLocal, setLanguageLocal]: LanguageDispatcher = useState(
    language,
  );
  useEffect((): MountedUseEffect => {
    let timeout: number;
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
    <HelmetProvider>
      <GlobalContextProvider
        value={{
          titleDispatcher: [titleLocal, setTitleLocal],
          isDarkThemeDispatcher: [isDarkThemeLocal, setIsDarkThemeLocal],
          isMobileDispatcher: [isMobileLocal, setIsMobileLocal],
          isSlideOutMenuOpenDispatcher: [
            isSlideOutMenuOpenLocal,
            setIsSlideOutMenuOpenLocal,
          ],
          isOnlineDispatcher: [isOnlineLocal, setIsOnlineLocal],
          languageDispatcher: [languageLocal, setLanguageLocal],
          isAuthorizedDispatcher: [isAuthorizedLocal, setIsAuthorizedLocal],
        }}
      >
        <BrowserRouter>
          <GlobalStyle isDarkTheme={isDarkThemeLocal} />
          {isMobileLocal ? null : <Overlay
            onClick={(): void => setIsSlideOutMenuOpenLocal(false)}
            isSlideOutMenuOpen={isSlideOutMenuOpenLocal}
          />}
          {isMobileLocal ? <MobileUpsideMenu /> : <DesktopTopMenu />}
          <SlideOutMenuButton />
          {isMobileLocal ? <MobileColorThemeButton /> : null}
          <SlideOutMenu />
        </BrowserRouter>
      </GlobalContextProvider>
    </HelmetProvider>
  );
};

export default App;
