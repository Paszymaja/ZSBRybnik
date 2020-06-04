import React, { FC } from 'react';
//import { useTranslation, UseTranslationResponse } from'react-i18next';
import Page from '../components/Page';
import queryString, { ParsedQuery } from 'query-string';
import Section from '../components/Section';
import CodeBlock from '../components/CodeBlock';
import TextBlock from '../components/TextBlock';
//import { useHistory } from 'react-router-dom';

interface SubpageProps { }

const Subpage: FC<SubpageProps> = (): JSX.Element => {
  const parsedLocation: ParsedQuery<string> = queryString.parse(window.location.search);
  const parsedLocationRoute: string | string[] | null | undefined = parsedLocation.route;
  const isParsedLocationValid: boolean = parsedLocationRoute === undefined || parsedLocationRoute === null ? false : true;
  const firstLineErrorText: string = "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego podstronę. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string = "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const codeBlockValue: string = `${window.location.origin}${window.location.pathname}&route=nazwa-podstrony`;
  return (
    <Page title="subpage">
      {isParsedLocationValid === true ? null : <h2>Podaj parametr route, żeby przenieść się do odpowiedniej podstrony:</h2>}
      <Section>
        {isParsedLocationValid === true ? 123 : <>
          <TextBlock value={firstLineErrorText} />
          <CodeBlock language="md" value={codeBlockValue}></CodeBlock>
          <TextBlock value={secondLineErrorText} />
        </>}
      </Section>
    </Page>
  );
};

export default Subpage;
