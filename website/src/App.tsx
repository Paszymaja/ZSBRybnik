import React, { useState, useEffect } from 'react';
import GlobalStyle from './components/GlobalStyle';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error404 from './pages/Error404';
import MainPage from './pages/MainPage';
import Subpage from './pages/Subpage';
import PostPage from './pages/PostPage';
import DesktopTopMenu from './components/DesktopTopMenu';
import { GlobalContextProvider, initialGlobalStoreValue } from './stores/globalStore';
import MainSection from './components/MainSection';
import MobileUpsideMenu from './components/MobileUpsideMenu';
import SlideOutMenuButton from './components/SlideOutMenuButton';
import SlideOutMenu from './components/SlideOutMenu';
import MobileBottomMenu from './components/MobileBottomMenu';
import Overlay from './components/Overlay';
import MobileColorThemeButton from './components/MobileColorThemeButton';
import { HelmetProvider } from 'react-helmet-async';
import MainSectionBottomSpacer from './components/MainSectionBottomSpacer';
import MainSectionContent from './components/MainSectionContent';
import Push from 'push.js';

const { isDarkTheme, isMobile, title, isSlideOutMenuOpen, isOnline } = initialGlobalStoreValue;

const App = (): JSX.Element => {
  const [isDarkThemeLocal, setIsDarkThemeLocal] = useState(isDarkTheme);
  const [isMobileLocal, setIsMobileLocal] = useState(isMobile);
  const [titleLocal, setTitleLocal] = useState(title);
  const [isSlideOutMenuOpenLocal, setIsSlideOutMenuOpenLocal] = useState(isSlideOutMenuOpen);
  const [isOnlineLocal, setIsOnlineLocal] = useState(isOnline);
  useEffect((): () => void => {
    let timeout: number;
    const resizeHandler = (): void => {
      const isMobile: boolean = window.innerWidth <= 768 ? true : false;
      setIsMobileLocal(isMobile);
    }
    const copyHandler = (event: ClipboardEvent): void => {
      const selection: Selection | null = document.getSelection();
      const modifiedSelection: string = `${selection!.toString()}\n\nZawartość została skopiowana ze strony Zespołu Szkół Budowlanych w Rybniku \u00a9. Wszystkie prawa zastrzeżone.`;
      event.clipboardData?.setData('text/plain', modifiedSelection);
      event.preventDefault();
    }
    const onlineHandler = (type: string): void => {
      const fixedIsOnline: boolean = type === 'online' ? true : false;
      setIsOnlineLocal(fixedIsOnline);
      const pushTitle: string = fixedIsOnline ? 'O, widzę, że wróciłeś do żywych!' : 'Twoje połączenie internetowe zostało zerwane 😭.';
      const pushMessage: string = fixedIsOnline ? 'Teraz możesz znów spokojnie przeglądać treści online.' : 'Nie będziesz miał dostępu do wszystkich treści do póki nie staniesz się ponownie online.';
      Push.create(pushTitle, {
        body: pushMessage,
        icon: '/images/logo.png'
      });
      if (fixedIsOnline) {
        window.location.reload();
      }
    }
    const copyListenerHandler = (e: Event): void => copyHandler(e as ClipboardEvent);
    const resizeLinstenerHandler = (): void => {
      clearTimeout(timeout);
      timeout = setTimeout(resizeHandler, 75);
    }
    const onlineListenerHandler = ({ type }: Event): void => onlineHandler(type);
    window.addEventListener('resize', resizeLinstenerHandler);
    window.addEventListener('copy', copyListenerHandler);
    window.addEventListener('online', onlineListenerHandler);
    window.addEventListener('offline', onlineListenerHandler);
    return (): void => {
      window.removeEventListener('resize', resizeLinstenerHandler);
      window.removeEventListener('copy', copyListenerHandler);
      window.removeEventListener('online', onlineListenerHandler);
      window.removeEventListener('offline', onlineListenerHandler);
    }
  }, []);
  return (
    <HelmetProvider>
      <GlobalContextProvider value={{ isDarkThemeDispatcher: [isDarkThemeLocal, setIsDarkThemeLocal], isMobileDispatcher: [isMobileLocal, setIsMobileLocal], isSlideOutMenuOpenDispatcher: [isSlideOutMenuOpenLocal, setIsSlideOutMenuOpenLocal], titleDispatcher: [titleLocal, setTitleLocal], isOnlineDispatcher: [isOnlineLocal, setIsOnlineLocal] }}>
        <BrowserRouter>
          <GlobalStyle isDarkTheme={isDarkThemeLocal} />
          {isMobileLocal ? null : <Overlay onClick={() => setIsSlideOutMenuOpenLocal(!isSlideOutMenuOpenLocal)} isSlideOutMenuOpen={isSlideOutMenuOpenLocal} />}
          {isMobileLocal ? <MobileUpsideMenu /> : <DesktopTopMenu />}
          <SlideOutMenuButton />
          {isMobileLocal ? <MobileColorThemeButton /> : null}
          <SlideOutMenu />
          <MainSection>
            <MainSectionContent>
              <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/subpage' component={Subpage} />
                <Route path='/post' component={PostPage} />
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
}

export default App;
