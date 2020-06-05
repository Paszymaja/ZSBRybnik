import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
//import { useTranslation, UseTranslationResponse } from'react-i18next';
import Page from '../components/Page';
import queryString, { ParsedQuery } from 'query-string';
import Section from '../components/Section';
import CodeBlock from '../components/CodeBlock';
import TextBlock from '../components/TextBlock';
import { compiler } from 'markdown-to-jsx';
import { markdownOptions } from '../other/makrdownOptions';
import { useHistory } from 'react-router-dom';
import subscribeGoogleAnalytics from '../other/subscribeGoogleAnalytics';
import makeSubpageContentRequest from '../other/makeSubpageContentRequest';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import Link from '../components/Link';

type markdownDispatcher = [string, Dispatch<SetStateAction<string>>];

interface SubpageProps { }

const Subpage: FC<SubpageProps> = (): JSX.Element => {
  const parsedLocation: ParsedQuery<string> = queryString.parse(window.location.search);
  const parsedLocationRoute: string | string[] | null | undefined = parsedLocation.route;
  const isParsedLocationValid: boolean = parsedLocationRoute === undefined || parsedLocationRoute === null ? false : true;
  const firstLineErrorText: string = "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego podstronę. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string = "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const codeBlockValue: string = `${window.location.origin}${window.location.pathname}&route=nazwa-podstrony`;
  const [markdown, setMarkdown]: markdownDispatcher = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory();
  const [displayTitle, setDisplayTitle] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { t }: UseTranslationResponse = useTranslation();
  const compiledMarkdown: JSX.Element = compiler(markdown, markdownOptions);
  const compiledMarkdownRender = compiledMarkdown.key === "outer" ? compiledMarkdown.props.children : compiledMarkdown;
  useEffect((): void => {
    if (isMounted) {
      subscribeGoogleAnalytics(history);
    }
  }, [history, isMounted]);
  useEffect((): void => {
    setIsMounted(true);
  }, [setIsMounted])
  useEffect((): void => {
    makeSubpageContentRequest(parsedLocationRoute as string, setTitle, setDisplayTitle, setMarkdown, t);
  }, [parsedLocationRoute, t]);
  return (
    <Page title={title}>
      {isParsedLocationValid ? displayTitle ? <h2>{title === "" ? "" : `${title}:`}</h2> : null : <h2>Podaj parametr route, żeby przenieść się do odpowiedniej podstrony:</h2>}
      <Section>
        {isParsedLocationValid === true ? compiledMarkdownRender : <>
          <TextBlock value={firstLineErrorText} />
          <CodeBlock language="md" value={codeBlockValue}></CodeBlock>
          <TextBlock value={secondLineErrorText} />
          <Link href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues" title="Zgłoś błąd" />
        </>}
      </Section>
    </Page>
  );
};

export default Subpage;
