import React, { FC, useContext, useEffect } from 'react';
import Page from '../components/Page';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import GlobalContext from '../stores/globalStore';
import subscribeGoogleAnalytics from '../other/subscribeGoogleAnalytics';
import { useHistory } from 'react-router-dom';

interface MainPageProps { }

const MainPage: FC<MainPageProps> = (): JSX.Element => {
  const history = useHistory();
  const { t }: UseTranslationResponse = useTranslation();
  const { isOnlineDispatcher } = useContext(GlobalContext);
  const [isOnline] = isOnlineDispatcher;
  const title: string = isOnline ? t('pages.home') : "Strona główna";
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  return (
    <Page title={title}>
    </Page>
  );
};

export default MainPage;