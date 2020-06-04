import React, { FC } from 'react';
import Page from '../components/Page';

interface MainPageProps { }

const MainPage: FC<MainPageProps> = (): JSX.Element => {
  return (
    <Page title="Strona główna">
    </Page>
  );
};

export default MainPage;