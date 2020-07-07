import {
  createContext,
  Context,
  Consumer,
  Provider,
  Dispatch,
  SetStateAction,
} from "react";
import i18n from "i18next";

export type GlobalContext = Context<GlobalContextCompleteValues>;
type GlobalContextConsumer = Consumer<GlobalContextCompleteValues>;
type GlobalContextProvider = Provider<GlobalContextCompleteValues>;

export type IsDarkThemeDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];
export type IsMobileDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type IsSlideOutMenuOpenDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];
export type IsOnlineDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type LanguageDispatcher = [string, Dispatch<SetStateAction<string>>];
export type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
export type IsAuthorizedDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];

export interface GlobalContextCompleteValues {
  isDarkThemeDispatcher: IsDarkThemeDispatcher;
  isSlideOutMenuOpenDispatcher: IsSlideOutMenuOpenDispatcher;
  titleDispatcher: TitleDispatcher;
  isMobileDispatcher: IsMobileDispatcher;
  isOnlineDispatcher: IsOnlineDispatcher;
  languageDispatcher: LanguageDispatcher;
  isAuthorizedDispatcher: IsAuthorizedDispatcher;
}

export interface GlobalContextValues {
  isDarkTheme: boolean;
  title: string;
  isSlideOutMenuOpen: boolean;
  isMobile: boolean;
  isOnline: boolean;
  language: string;
  isAuthorized: boolean;
}

export const initialGlobalStoreValue: GlobalContextValues = {
  isDarkTheme: window.localStorage.getItem("isDarkTheme") === "true"
    ? true
    : false,
  title: "",
  isSlideOutMenuOpen: false,
  isMobile: window.innerWidth < 768 ? true : false,
  isOnline: window.navigator.onLine,
  language: (i18n.language || window.localStorage.i18nextLng ||
    window.navigator.language)
    ? (i18n.language || window.localStorage.i18nextLng ||
      window.navigator.language).slice(0, 2)
    : "pl",
  isAuthorized: false,
};

const GlobalContext: GlobalContext = createContext<GlobalContextCompleteValues>(
  initialGlobalStoreValue as unknown as GlobalContextCompleteValues,
);
export const GlobalContextConsumer: GlobalContextConsumer =
  GlobalContext.Consumer;
export const GlobalContextProvider: GlobalContextProvider =
  GlobalContext.Provider;

export default GlobalContext;
