import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  Suspense,
  lazy,
  LazyExoticComponent,
} from "react";
import GlobalStyle from "./components/GlobalStyle";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SubpageProps } from "./pages/Subpage";
import { PostPageProps } from "./pages/PostPage";
import DesktopTopMenu from "./components/DesktopTopMenu/DesktopTopMenu";
import {
  GlobalContextProvider,
  initialGlobalStoreValue,
  GlobalContextValues,
  PostsListDispatcher,
  ToSubtractDispatcher,
  SubpagesDispatcher,
  PostsDispatcher,
  IsOnlineDispatcher,
  LanguageDispatcher,
  PrivilegeLevelDispatcher,
} from "./contextes/globalContext";
import "react-toastify/dist/ReactToastify.css";
import MainSection from "./components/MainSection/MainSection";
import MobileUpsideMenu from "./components/MobileUpsideMenu/MobileUpsideMenu";
import SlideOutMenuButton from "./components/SlideOutMenu/SlideOutMenuButton";
import SlideOutMenu from "./components/SlideOutMenu/SlideOutMenu";
import MobileBottomMenu from "./components/MobileBottomMenu/MobileBottomMenu";
import Overlay from "./components/Overlay";
import MobileColorThemeButton from "./components/MobileColorThemeButton/MobileColorThemeButton";
import { HelmetProvider } from "react-helmet-async";
import MainSectionBottomSpacer from "./components/MainSection/MainSectionBottomSpacer";
import MainSectionContent from "./components/MainSection/MainSectionContent";
import Push from "push.js";
import PrivateRoute from "./components/PrivateRoute";
import AddPostPage from "./pages/AddPostPage";
import { MainPageProps } from "./pages/MainPage";
import { ToastContainerProps, toast } from "react-toastify";
import {
  ResetPasswordPageProps,
} from "./pages/ResetPasswordPage";
import { Error404Props } from "./pages/Error404";
import { LoginPageProps } from "./pages/LoginPage";
import { EditPostPageProps } from "./pages/EditPostPage";
import { DeletePostPageProps } from "./pages/DeletePostPage";

const ToastContainer: LazyExoticComponent<FC<ToastContainerProps>> = lazy(
  async () => {
    const module = await import("react-toastify");
    return { default: module.ToastContainer };
  },
);
const Presentation = lazy(() =>
  import("./components/Presentation/Presentation")
);
const MainPage: LazyExoticComponent<FC<MainPageProps>> = lazy(() =>
  import("./pages/MainPage")
);
const Subpage: LazyExoticComponent<FC<SubpageProps>> = lazy(() =>
  import("./pages/Subpage")
);
const PostPage: LazyExoticComponent<FC<PostPageProps>> = lazy(() =>
  import("./pages/PostPage")
);
const Error404: LazyExoticComponent<FC<Error404Props>> = lazy(() =>
  import("./pages/Error404")
);
const ResetPasswordPage: LazyExoticComponent<FC<ResetPasswordPageProps>> = lazy(
  () => import("./pages/ResetPasswordPage"),
);
const LoginPage: LazyExoticComponent<FC<LoginPageProps>> = lazy(() =>
  import("./pages/LoginPage")
);
const EditPostPage: LazyExoticComponent<FC<EditPostPageProps>> = lazy(() =>
  import("./pages/EditPostPage")
);
const DeletePostPage: LazyExoticComponent<FC<DeletePostPageProps>> = lazy(() =>
  import("./pages/DeletePostPage")
);

interface AppProps {}

type IsDarkThemeDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type IsMobileDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type IsSlideOutMenuOpenDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];

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
  privilegeLevel,
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
  const [privilegeLevelLocal, setPrivilegeLevelLocal]:
    PrivilegeLevelDispatcher = useState(
      privilegeLevel,
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
      if (isMobileLocal) {
        const pushTitle: string = fixedIsOnline
          ? "O, widzę, że wróciłeś do żywych!"
          : "Twoje połączenie internetowe zostało zerwane 😭";
        const pushMessage: string = fixedIsOnline
          ? "Teraz możesz znów spokojnie przeglądać treści online"
          : "Nie będziesz miał dostępu do wszystkich treści do póki nie staniesz się ponownie online";
        Push.create(pushTitle, {
          body: pushMessage,
          icon: "/images/logo.webp",
        });
      } else {
        const pushMessage: string = fixedIsOnline
          ? "O, widzę, że wróciłeś do żywych!"
          : "Twoje połączenie internetowe zostało zerwane 😭";
        toast.info(pushMessage);
      }
      fixedIsOnline && window.location.reload();
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
  }, [isMobileLocal]);
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
          privilegeLevelDispatcher: [
            privilegeLevelLocal,
            setPrivilegeLevelLocal,
          ],
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
          {isMobileLocal && <MobileColorThemeButton />}
          <SlideOutMenu />
          <MainSection>
            <MainSectionContent>
              <Suspense fallback={<></>}>
                <Switch>
                  <Route path="/" exact component={MainPage} />
                  <Route path="/subpage" exact component={Subpage} />
                  <Route path="/subpage/:route" exact component={Subpage} />
                  <Route path="/post" exact component={PostPage} />
                  <Route path="/post/:id" exact component={PostPage} />
                  <Route path="/login" exact component={LoginPage} />
                  <Route
                    path="/reset-password"
                    exact
                    component={ResetPasswordPage}
                  />
                  <PrivateRoute
                    exact
                    path="/add-post"
                    forPrivilegeLevelAndHigher="admin"
                    component={AddPostPage}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-post"
                    forPrivilegeLevelAndHigher="admin"
                    component={EditPostPage}
                  />
                  <PrivateRoute
                    exact
                    path="/delete-post"
                    forPrivilegeLevelAndHigher="admin"
                    component={DeletePostPage}
                  />;
                  <Route component={Error404} />
                </Switch>
              </Suspense>
              {!isMobileLocal && <Suspense fallback={<></>}>
                <Presentation />
              </Suspense>}
            </MainSectionContent>
            {!isMobileLocal && <MainSectionBottomSpacer />}
          </MainSection>
          {isMobileLocal && <MobileBottomMenu />}
          <Suspense fallback={<></>}>
            <ToastContainer
              position="bottom-right"
              pauseOnFocusLoss={false}
            />
          </Suspense>
        </BrowserRouter>
      </GlobalContextProvider>
    </HelmetProvider>
  );
};

export default App;
