import React, { FC, useEffect, useContext, useState } from 'react';
import Page from '../components/Page';
import { useHistory } from 'react-router-dom';
import subscribeGoogleAnalytics from '../other/subscribeGoogleAnalytics';
import Section from '../components/Section';
import TextBlock from '../components/TextBlock';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import GlobalContext from '../stores/globalStore';

interface Error404Props { }

const Error404: FC<Error404Props> = (): JSX.Element => {
  const history = useHistory();
  const { t }: UseTranslationResponse = useTranslation();
  const { isOnlineDispatcher } = useContext(GlobalContext);
  const [isOnline] = isOnlineDispatcher;
  const [isMounted, setIsMounted] = useState(false);
  const title: string = isOnline ? t('error-pages.404-error.title') : "Błąd 404";
  useEffect((): void => {
    if (isMounted) {
      subscribeGoogleAnalytics(history);
    }
  }, [history, isMounted]);
  useEffect((): void => {
    setIsMounted(true);
  }, [setIsMounted])
  const errorCodeText: string = isOnline ? t('error-pages.404-error.errorText') : 'Niestety nie udało nam się znaleźć żadnej treści pod tym adresem.';
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <TextBlock value={errorCodeText} />
      </Section>
    </Page>
  );
};

export default Error404;