import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import MainPage from "./pages/MainPage";
import Subpage from "./pages/Subpage";
import PostPage from "./pages/PostPage";
import DesktopTopMenu from "./components/DesktopTopMenu";
import {
  GlobalContextProvider,
  initialGlobalStoreValue,
  GlobalContextValues,
  PostsListDispatcher,
  ToSubtractDispatcher,
  SubpagesDispatcher,
  PostsDispatcher,
} from "./stores/globalStore";
import MainSection from "./components/MainSection";
import MobileUpsideMenu from "./components/MobileUpsideMenu";
import SlideOutMenuButton from "./components/SlideOutMenuButton";
import SlideOutMenu from "./components/SlideOutMenu";
import MobileBottomMenu from "./components/MobileBottomMenu";
import Overlay from "./components/Overlay";
import MobileColorThemeButton from "./components/MobileColorThemeButton";
import { HelmetProvider } from "react-helmet-async";
import MainSectionBottomSpacer from "./components/MainSectionBottomSpacer";
import MainSectionContent from "./components/MainSectionContent";
import Push from "push.js";

interface AppProps {}

type IsDarkThemeDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type IsMobileDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type IsSlideOutMenuOpenDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];
type IsOnlineDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type LanguageDispatcher = [string, Dispatch<SetStateAction<string>>];
type MountedUseEffect = () => void;
type OnlineHandler = (type: string) => void;
type CopyListenerHandler = (e: Event) => void;
type ResizeLinstenerHandler = () => void;
type OnlineListenerHandler = (e: Event) => void;

const {
  isDarkTheme,
  isMobile,
  title,
  isSlideOutMenuOpen,
  isOnline,
  language,
  postsList,
  toSubtract,
  subpages,
  posts,
}: GlobalContextValues = initialGlobalStoreValue;

const App: FC<AppProps> = (): JSX.Element => {
  const [isDarkThemeLocal, setIsDarkThemeLocal]: IsDarkThemeDispatcher =
    useState(isDarkTheme);
  const [isMobileLocal, setIsMobileLocal]: IsMobileDispatcher = useState(
    isMobile,
  );
  const [titleLocal, setTitleLocal]: TitleDispatcher = useState(title);
  const [isSlideOutMenuOpenLocal, setIsSlideOutMenuOpenLocal]:
    IsSlideOutMenuOpenDispatcher = useState(
      isSlideOutMenuOpen,
    );
  const [isOnlineLocal, setIsOnlineLocal]: IsOnlineDispatcher = useState(
    isOnline,
  );
  const [languageLocal, setLanguageLocal]: LanguageDispatcher = useState(
    language,
  );
  const [postsListLocal, setPostsListLocal]: PostsListDispatcher = useState(
    postsList,
  );
  const [postsLocal, setPostsLocal]: PostsDispatcher = useState(
    posts,
  );
  const [toSubtractLocal, setToSubtractLocal]: ToSubtractDispatcher = useState(
    toSubtract,
  );
  const [subpagesLocal, setSubpagesLocal]: SubpagesDispatcher = useState(
    subpages,
  );
  useEffect((): MountedUseEffect => {
    let timeout: number;
    const resizeHandler = (): void => {
      const isMobile: boolean = window.innerWidth < 768 ? true : false;
      setIsMobileLocal(isMobile);
    };
    const copyHandler = (event: ClipboardEvent): void => {
      const selection: Selection | null = document.getSelection();
      const modifiedSelection: string = `${
        selection!.toString()
      }\n\nZawartość została skopiowana ze strony Zespołu Szkół Budowlanych w Rybniku \u00a9. Wszystkie prawa zastrzeżone.`;
      event.clipboardData?.setData("text/plain", modifiedSelection);
      event.preventDefault();
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
        icon: "/images/logo.png",
      });
      if (fixedIsOnline) {
        window.location.reload();
      }
    };
    const copyListenerHandler: CopyListenerHandler = (e: Event): void =>
      copyHandler(e as ClipboardEvent);
    const resizeLinstenerHandler: ResizeLinstenerHandler = (): void => {
      clearTimeout(timeout);
      timeout = setTimeout(resizeHandler, 75);
    };
    const onlineListenerHandler: OnlineListenerHandler = (
      { type }: Event,
    ): void => onlineHandler(type);
    window.addEventListener("resize", resizeLinstenerHandler);
    window.addEventListener("copy", copyListenerHandler);
    window.addEventListener("online", onlineListenerHandler);
    window.addEventListener("offline", onlineListenerHandler);
    return (): void => {
      window.removeEventListener("resize", resizeLinstenerHandler);
      window.removeEventListener("copy", copyListenerHandler);
      window.removeEventListener("online", onlineListenerHandler);
      window.removeEventListener("offline", onlineListenerHandler);
    };
  }, []);
  return (
    <HelmetProvider>
      <GlobalContextProvider
        value={{
          isDarkThemeDispatcher: [isDarkThemeLocal, setIsDarkThemeLocal],
          isMobileDispatcher: [isMobileLocal, setIsMobileLocal],
          isSlideOutMenuOpenDispatcher: [
            isSlideOutMenuOpenLocal,
            setIsSlideOutMenuOpenLocal,
          ],
          titleDispatcher: [titleLocal, setTitleLocal],
          isOnlineDispatcher: [isOnlineLocal, setIsOnlineLocal],
          languageDispatcher: [languageLocal, setLanguageLocal],
          postsListDispatcher: [postsListLocal, setPostsListLocal],
          toSubtractDispatcher: [toSubtractLocal, setToSubtractLocal],
          subpagesDispatcher: [subpagesLocal, setSubpagesLocal],
          postsDispatcher: [postsLocal, setPostsLocal],
        }}
      >
        <BrowserRouter>
          <GlobalStyle isDarkTheme={isDarkThemeLocal} />
          {isMobileLocal ? null : <Overlay
            onClick={() => setIsSlideOutMenuOpenLocal(!isSlideOutMenuOpenLocal)}
            isSlideOutMenuOpen={isSlideOutMenuOpenLocal}
          />}
          {isMobileLocal ? <MobileUpsideMenu /> : <DesktopTopMenu />}
          <SlideOutMenuButton />
          {isMobileLocal ? <MobileColorThemeButton /> : null}
          <SlideOutMenu />
          <MainSection>
            <MainSectionContent>
              <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/subpage" component={Subpage} />
                <Route path="/post" component={PostPage} />
                <Route component={Error404} />
              </Switch>
            </MainSectionContent>
            {isMobileLocal ? null : <MainSectionBottomSpacer />}
          </MainSection>
          {isMobileLocal ? <MobileBottomMenu /> : null}
        </BrowserRouter>
      </GlobalContextProvider>
    </HelmetProvider>
  );
};

export default App;
