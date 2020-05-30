import { createContext, ExoticComponent, ConsumerProps, Context, Consumer, Provider } from 'react';

export type GlobalContext = Context<GlobalStoreValue>;
export type GlobalContextConsumer = ExoticComponent<ConsumerProps<GlobalStoreValue>>;
type GlobalStoreConsumer = Consumer<GlobalStoreValue>;
type GlobalStoreProvider = Provider<GlobalStoreValue>

export interface GlobalStoreValue {
  isDarkTheme: boolean;
  title: string;
}

export const initialGlobalStoreValue: GlobalStoreValue = {
  isDarkTheme: window.localStorage.getItem('isDarkTheme') === 'true' ? true : false,
  title: ''
}

const GlobalStore: GlobalContext = createContext(initialGlobalStoreValue);
export const GlobalStoreConsumer: GlobalContextConsumer = GlobalStore.Consumer;
export const GlobalStoreProvider: GlobalStoreProvider = GlobalStore.Provider;

export default GlobalStore;