import {
  createContext,
  Context,
  Consumer,
  Provider,
  Dispatch,
  SetStateAction,
} from "react";
import i18n from "i18next";
import { PostProps } from "../components/Post/Post";
import parseJWT, { Token } from "../other/parseJWT";

export type GlobalContext = Context<GlobalContextCompleteValues>;
type GlobalContextConsumer = Consumer<GlobalContextCompleteValues>;
type GlobalContextProvider = Provider<GlobalContextCompleteValues>;

export type IsDarkThemeDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];
export type IsMobileDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
export type IsSlideOutMenuOpenDispatcher = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];
export type IsOnlineDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type LanguageDispatcher = [string, Dispatch<SetStateAction<string>>];
export type PostsListDispatcher = [
  PostProps[],
  Dispatch<SetStateAction<PostProps[]>>
];
export type PostsDispatcher = [Posts, Dispatch<SetStateAction<Posts>>];
export type ToSubtractDispatcher = [number, Dispatch<SetStateAction<number>>];
export type SubpagesDispatcher = [Subpages, Dispatch<SetStateAction<Subpages>>];
export type PrivilegeLevelDispatcher = [
  PrivilegeLevel,
  Dispatch<SetStateAction<PrivilegeLevel>>
];

export type PrivilegeLevel = "unlogged" | "student" | "admin";

export interface Subpages {
  [key: string]: {
    content: string;
    title: string;
    displayTitle: boolean;
  };
}

export interface Posts {
  [key: string]: Post;
}

export interface Post {
  content: string;
  title: string;
  author: string;
}

export interface GlobalContextCompleteValues {
  isDarkThemeDispatcher: IsDarkThemeDispatcher;
  titleDispatcher: TitleDispatcher;
  isSlideOutMenuOpenDispatcher: IsSlideOutMenuOpenDispatcher;
  isMobileDispatcher: IsMobileDispatcher;
  isOnlineDispatcher: IsOnlineDispatcher;
  languageDispatcher: LanguageDispatcher;
  postsListDispatcher: PostsListDispatcher;
  postsDispatcher: PostsDispatcher;
  toSubtractDispatcher: ToSubtractDispatcher;
  subpagesDispatcher: SubpagesDispatcher;
  privilegeLevelDispatcher: PrivilegeLevelDispatcher;
}

export interface GlobalContextValues {
  isDarkTheme: boolean;
  title: string;
  isSlideOutMenuOpen: boolean;
  isMobile: boolean;
  isOnline: boolean;
  language: string;
  postsList: PostProps[];
  posts: Posts;
  subpages: Subpages;
  toSubtract: number;
  privilegeLevel: PrivilegeLevel;
}

let parsedTokenRole: PrivilegeLevel;
const token: string = window.localStorage.token;
try {
  const parsedToken: Token = parseJWT(token);
  if (parsedToken && parsedToken.role) {
    parsedTokenRole = parsedToken.role;
  } else {
    parsedTokenRole = "unlogged";
  }
} catch (err) {
  parsedTokenRole = "unlogged";
}

export const initialGlobalStoreValue: GlobalContextValues = {
  isDarkTheme:
    window.localStorage.getItem("isDarkTheme") === "true" ? true : false,
  title: "",
  isSlideOutMenuOpen: false,
  isMobile: window.innerWidth < 768 ? true : false,
  isOnline: window.navigator.onLine,
  language:
    i18n.language || window.localStorage.i18nextLng || window.navigator.language
      ? (
          i18n.language ||
          window.localStorage.i18nextLng ||
          window.navigator.language
        ).slice(0, 2)
      : "pl",
  postsList: [],
  posts: {},
  subpages: {},
  toSubtract: 0,
  privilegeLevel: parsedTokenRole,
};

const GlobalContext: GlobalContext = createContext<GlobalContextCompleteValues>(
  (initialGlobalStoreValue as unknown) as GlobalContextCompleteValues
);
export const GlobalContextConsumer: GlobalContextConsumer =
  GlobalContext.Consumer;
export const GlobalContextProvider: GlobalContextProvider =
  GlobalContext.Provider;

export default GlobalContext;
