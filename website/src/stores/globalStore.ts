import { createContext, Context, Consumer, Provider, Dispatch, SetStateAction } from 'react';

export type GlobalContext = Context<GlobalContextCompleteValues>;
type GlobalContextConsumer = Consumer<GlobalContextCompleteValues>;
type GlobalContextProvider = Provider<GlobalContextCompleteValues>

type IsDarkThemeDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type IsMobileDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type IsSlideOutMenuOpen = [boolean, Dispatch<SetStateAction<boolean>>];
type IsOnlineDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];

export interface GlobalContextCompleteValues {
  isDarkThemeDispatcher: IsDarkThemeDispatcher;
  titleDispatcher: TitleDispatcher;
  isSlideOutMenuOpenDispatcher: IsSlideOutMenuOpen;
  isMobileDispatcher: IsMobileDispatcher;
  isOnlineDispatcher: IsOnlineDispatcher;
}

interface GlobalContextValues {
  isDarkTheme: boolean;
  title: string;
  isSlideOutMenuOpen: boolean;
  isMobile: boolean;
  isOnline: boolean;
}

export const initialGlobalStoreValue: GlobalContextValues = {
  isDarkTheme: window.localStorage.getItem('isDarkTheme') === 'true' ? true : false,
  title: '',
  isSlideOutMenuOpen: false,
  isMobile: window.innerWidth <= 768 ? true : false,
  isOnline: window.navigator.onLine
}

const GlobalContext: GlobalContext = createContext<GlobalContextCompleteValues>(initialGlobalStoreValue as unknown as GlobalContextCompleteValues);
export const GlobalContextConsumer: GlobalContextConsumer = GlobalContext.Consumer;
export const GlobalContextProvider: GlobalContextProvider = GlobalContext.Provider;

export default GlobalContext;