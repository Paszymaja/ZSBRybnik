import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import Page from "../components/Page";
import Section from "../components/Section";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import TextBlock from "../components/TextBlock/TextBlock";
import { compiler } from "markdown-to-jsx";
import markdownOptions from "../other/makrdownOptions";
import { RouteComponentProps } from "react-router-dom";
import Link from "../components/Link/Link";
import GlobalContext, {
  GlobalContextCompleteValues,
  SubpagesDispatcher,
  LanguageDispatcher,
  Subpages,
  IsOnlineDispatcher,
} from "../contextes/globalContext";
import { useTranslation, UseTranslationResponse } from "react-i18next";

type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type DisplayTitleDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type ParseErrorDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type SetNotFoundError = [boolean, Dispatch<SetStateAction<boolean>>];
type CompiledMarkdownRender = [
  JSX.Element,
  Dispatch<SetStateAction<JSX.Element>>
];
type Subpage = {
  displayTitle: boolean;
  content: string;
  title: string;
};

interface SubpageRouteProps {
  route: string;
}

export interface SubpageProps extends RouteComponentProps<SubpageRouteProps> {}

const Subpage: FC<SubpageProps> = ({
  match: {
    params: { route },
  },
}: SubpageProps): JSX.Element => {
  const {
    subpagesDispatcher,
    languageDispatcher,
    isOnlineDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const [subpages, setSubpages]: SubpagesDispatcher = subpagesDispatcher;
  const { t }: UseTranslationResponse = useTranslation();
  const parsedLocationRoute: string = route ? route : "";
  const isParsedLocationValid: boolean =
    parsedLocationRoute === "" ? false : true;
  const firstLineErrorText: string = isOnline
    ? t("subpage.first-line-error-text")
    : "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego podstronę. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string = isOnline
    ? t("subpage.second-line-error-text")
    : "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const codeBlockValue: string = `${window.location.origin}${
    window.location.pathname
  }/${isOnline ? t("subpage.name-of-subpage") : "nazwa-podstrony"}`;
  const [language]: LanguageDispatcher = languageDispatcher;
  const [title, setTitle]: TitleDispatcher = useState("");
  const [notFoundError, setNotFoundError]: SetNotFoundError = useState(
    false
  ) as SetNotFoundError;
  const [displayTitle, setDisplayTitle]: DisplayTitleDispatcher = useState(
    false
  ) as DisplayTitleDispatcher;
  const [parseError, setParseError]: ParseErrorDispatcher = useState(
    false
  ) as ParseErrorDispatcher;
  const [
    compiledMarkdownRender,
    setCompiledMarkdownRender,
  ]: CompiledMarkdownRender = useState(<></>);
  useEffect((): void => {
    setNotFoundError(false);
    const setMarkdown = (content: string): void => {
      try {
        const compiledMarkdown: JSX.Element = compiler(
          content,
          markdownOptions
        );
        const fixedCompiledMarkdown: JSX.Element =
          compiledMarkdown.key === "outer"
            ? typeof compiledMarkdown.props.children === "string"
              ? compiledMarkdown
              : compiledMarkdown.props.children
            : compiledMarkdown;
        setCompiledMarkdownRender(fixedCompiledMarkdown);
        setParseError(false);
      } catch (err) {
        console.error(err);
        setParseError(true);
      }
    };
    if (!subpages[parsedLocationRoute] && isParsedLocationValid) {
      const tryRequest = async (): Promise<void> => {
        const controller: AbortController = new AbortController();
        const signal: AbortSignal = controller.signal;
        const res: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-subpage?route=${parsedLocationRoute}&language=${language}`,
          {
            method: "GET",
            signal: signal,
          }
        );
        try {
          const { displayTitle, title, content }: Subpage = await res.json();
          setDisplayTitle(displayTitle);
          setTitle(title);
          setMarkdown(content);
          const fixedSubpages: Subpages = { ...subpages };
          fixedSubpages[parsedLocationRoute] = {
            title: title,
            content: content,
            displayTitle: displayTitle,
          };
          setSubpages(fixedSubpages);
        } catch (err) {
          controller.abort();
          const { status }: Response = res;
          if (status === 404) {
            setNotFoundError(true);
          }
        }
      };
      tryRequest();
    } else if (isParsedLocationValid) {
      const { displayTitle, title, content }: Subpage = subpages[
        parsedLocationRoute
      ];
      setDisplayTitle(displayTitle);
      setTitle(title);
      setMarkdown(content);
    }
  }, [
    parsedLocationRoute,
    language,
    setDisplayTitle,
    setTitle,
    setCompiledMarkdownRender,
    setParseError,
    isParsedLocationValid,
    setSubpages,
    subpages,
    setNotFoundError,
  ]);
  const errorLinkText: string = isOnline
    ? t("quick-actions.report-issue")
    : "Zgłoś błąd";
  const errorLink: string =
    "https://github.com/KrzysztofZawisla/ZSBRybnik/issues";
  return (
    <Page title={title}>
      {!isParsedLocationValid || parseError || notFoundError ? (
        <h2>
          {parseError || notFoundError
            ? parseError
              ? "Wystąpił błąd podczas przetwarzania treści:"
              : "Nie znaleziono podstrony:"
            : "Podaj parametr, żeby przenieść się do odpowiedniej podstrony:"}
        </h2>
      ) : displayTitle ? (
        title === "" ? null : (
          <h2>{`${title}:`}</h2>
        )
      ) : null}
      <Section>
        {!isParsedLocationValid || parseError || notFoundError ? (
          parseError || notFoundError ? (
            parseError ? (
              <>
                <TextBlock value="Nie jesteśmy w stanie wyświetlić treści. Najprawdopodobniej błąd leży po stronie serwera." />
                <Link title={errorLinkText} href={errorLink} />
              </>
            ) : (
              <>
                <TextBlock value="Niestety nie udało nam się odnaleźć podstrony skojarzonej z tym adresem. Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej." />
                <Link title={errorLinkText} href={errorLink} />
              </>
            )
          ) : (
            <>
              <TextBlock value={firstLineErrorText} />
              <CodeBlock language="md" value={codeBlockValue}></CodeBlock>
              <TextBlock value={secondLineErrorText} />
              <Link href={errorLink} title={errorLinkText} />
            </>
          )
        ) : (
          compiledMarkdownRender
        )}
      </Section>
    </Page>
  );
};

export default Subpage;
