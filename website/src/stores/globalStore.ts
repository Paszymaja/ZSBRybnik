import {
  createContext,
  Context,
  Consumer,
  Provider,
  Dispatch,
  SetStateAction,
} from "react";
import i18n from "i18next";
import { PostProps } from "../components/Post";

export type GlobalContext = Context<GlobalContextCompleteValues>;
type GlobalContextConsumer = Consumer<GlobalContextCompleteValues>;
type GlobalContextProvider = Provider<GlobalContextCompleteValues>;

export type IsDarkThemeDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];
export type IsMobileDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
export type IsSlideOutMenuOpen = [boolean, Dispatch<SetStateAction<boolean>>];
export type IsOnlineDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type LanguageDispatcher = [string, Dispatch<SetStateAction<string>>];
export type PostsDispatcher = [
  PostProps[],
  Dispatch<SetStateAction<PostProps[]>>,
];
export type ToSubtractDispatcher = [number, Dispatch<SetStateAction<number>>];
export type SubpagesDispatcher = [Subpages, Dispatch<SetStateAction<Subpages>>];

interface Subpages {
  [key: string]: {
    content: string;
    title: string;
    displayTitle: boolean;
  };
}

export interface GlobalContextCompleteValues {
  isDarkThemeDispatcher: IsDarkThemeDispatcher;
  titleDispatcher: TitleDispatcher;
  isSlideOutMenuOpenDispatcher: IsSlideOutMenuOpen;
  isMobileDispatcher: IsMobileDispatcher;
  isOnlineDispatcher: IsOnlineDispatcher;
  languageDispatcher: LanguageDispatcher;
  postsDispatcher: PostsDispatcher;
  toSubtractDispatcher: ToSubtractDispatcher;
  subpagesDispatcher: SubpagesDispatcher;
}

export interface GlobalContextValues {
  isDarkTheme: boolean;
  title: string;
  isSlideOutMenuOpen: boolean;
  isMobile: boolean;
  isOnline: boolean;
  language: string;
  posts: PostProps[];
  subpages: Subpages;
  toSubtract: number;
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
  posts: [],
  subpages: {},
  toSubtract: 0,
};

const GlobalContext: GlobalContext = createContext<GlobalContextCompleteValues>(
  initialGlobalStoreValue as unknown as GlobalContextCompleteValues,
);
export const GlobalContextConsumer: GlobalContextConsumer =
  GlobalContext.Consumer;
export const GlobalContextProvider: GlobalContextProvider =
  GlobalContext.Provider;

export default GlobalContext;
