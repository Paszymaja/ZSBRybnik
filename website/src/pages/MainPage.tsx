import React, { FC } from 'react';
import Page from '../components/Page';
import ThreejsView from '../components/ThreejsView';

interface MainPageProps { }

const MainPage: FC<MainPageProps> = (): JSX.Element => {
  return (
    <Page title="Strona główna">
      <ThreejsView modelPath="/models/scene.gltf" zPosition={15} xPosition={800} />
    </Page>
  );
};

export default MainPage;