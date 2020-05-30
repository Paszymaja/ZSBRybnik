import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import { GlobalStoreProvider, GlobalStoreConsumer, initialGlobalStoreValue } from './stores/globalStore';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error404 from './pages/Error404';
import MainPage from './pages/MainPage';
import Subpage from './pages/Subpage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <GlobalStoreProvider value={initialGlobalStoreValue}>
      <GlobalStoreConsumer>
        {({ isDarkTheme }): JSX.Element => <GlobalStyle isDarkTheme={isDarkTheme} />}
      </GlobalStoreConsumer>
      <BrowserRouter>
        <main>
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/subpage' component={Subpage} />
            <Route path='/post' component={PostPage} />
            <Route component={Error404} />
          </Switch>
        </main>
      </BrowserRouter>
    </GlobalStoreProvider>
  );
}

export default App;
