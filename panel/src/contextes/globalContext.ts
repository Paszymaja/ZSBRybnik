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

export interface GlobalContextCompleteValues {
  isDarkThemeDispatcher: IsDarkThemeDispatcher;
  isSlideOutMenuOpenDispatcher: IsSlideOutMenuOpenDispatcher;
  isMobileDispatcher: IsMobileDispatcher;
  isOnlineDispatcher: IsOnlineDispatcher;
  languageDispatcher: LanguageDispatcher;
}

export interface GlobalContextValues {
  isDarkTheme: boolean;
  isSlideOutMenuOpen: boolean;
  isMobile: boolean;
  isOnline: boolean;
  language: string;
}

export const initialGlobalStoreValue: GlobalContextValues = {
  isDarkTheme: window.localStorage.getItem("isDarkTheme") === "true"
    ? true
    : false,
  isSlideOutMenuOpen: false,
  isMobile: window.innerWidth < 768 ? true : false,
  isOnline: window.navigator.onLine,
  language: (i18n.language || window.localStorage.i18nextLng ||
    window.navigator.language)
    ? (i18n.language || window.localStorage.i18nextLng ||
      window.navigator.language).slice(0, 2)
    : "pl",
};

const GlobalContext: GlobalContext = createContext<GlobalContextCompleteValues>(
  initialGlobalStoreValue as unknown as GlobalContextCompleteValues,
);
export const GlobalContextConsumer: GlobalContextConsumer =
  GlobalContext.Consumer;
export const GlobalContextProvider: GlobalContextProvider =
  GlobalContext.Provider;

export default GlobalContext;
