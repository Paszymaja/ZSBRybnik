import React, { FC, useEffect } from 'react';
import Page from '../components/Page';
import { useHistory } from 'react-router-dom';
import subscribeGoogleAnalytics from '../other/subscribeGoogleAnalytics';
import Section from '../components/Section';
import TextBlock from '../components/TextBlock';

interface Error404Props { }

const Error404: FC<Error404Props> = (): JSX.Element => {
  const history = useHistory();
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  const errorCodeText: string = "Niestety nie udało nam się znaleźć żadnej strony pod tym adresem.";
  return (
    <Page title="Error 404">
      <h2>Błąd 404:</h2>
      <Section>
        <TextBlock value={errorCodeText} />
      </Section>
    </Page>
  );
};

export default Error404;