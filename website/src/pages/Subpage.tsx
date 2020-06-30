import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import Page from "../components/Page";
import queryString, { ParsedQuery } from "query-string";
import Section from "../components/Section";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import TextBlock from "../components/TextBlock/TextBlock";
import { compiler } from "markdown-to-jsx";
import markdownOptions from "../other/makrdownOptions";
import { useHistory } from "react-router-dom";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import Link from "../components/Link/Link";
import GlobalContext, {
  GlobalContextCompleteValues,
  SubpagesDispatcher,
  LanguageDispatcher,
  Subpages,
  IsOnlineDispatcher,
} from "../stores/globalStore";
import { useTranslation, UseTranslationResponse } from "react-i18next";

type MarkdownDispatcher = [string, Dispatch<SetStateAction<string>>];
type TitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type DisplayTitleDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type ParseErrorDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type Subpage = {
  displayTitle: boolean;
  content: string;
  title: string;
};

interface SubpageProps {}

const Subpage: FC<SubpageProps> = (): JSX.Element => {
  const { subpagesDispatcher, languageDispatcher, isOnlineDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const [subpages, setSubpages]: SubpagesDispatcher = subpagesDispatcher;
  const parsedLocation: ParsedQuery<string> = queryString.parse(
    window.location.search,
  );
  const parsedLocationRouteToFix: string | undefined = parsedLocation.route
    ?.toString();
  const parsedLocationRoute: string = parsedLocationRouteToFix
    ? parsedLocationRouteToFix
    : "";
  const isParsedLocationValid: boolean = parsedLocationRoute === ""
    ? false
    : true;
  const firstLineErrorText: string =
    "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego podstronę. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string =
    "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const codeBlockValue: string =
    `${window.location.origin}${window.location.pathname}&route=nazwa-podstrony`;
  const [language]: LanguageDispatcher = languageDispatcher;
  const [markdown, setMarkdown]: MarkdownDispatcher = useState("");
  const [title, setTitle]: TitleDispatcher = useState("");
  const history = useHistory();
  const { t }: UseTranslationResponse = useTranslation();
  const [displayTitle, setDisplayTitle]: DisplayTitleDispatcher = useState(
    false,
  ) as DisplayTitleDispatcher;
  const [parseError, setParseError]: ParseErrorDispatcher = useState(
    false,
  ) as ParseErrorDispatcher;
  let compiledMarkdown: JSX.Element;
  let compiledMarkdownRender: JSX.Element = <></>;
  try {
    compiledMarkdown = compiler(markdown, markdownOptions);
    compiledMarkdownRender = compiledMarkdown.key === "outer"
      ? typeof compiledMarkdown.props.children === "string"
        ? compiledMarkdown
        : compiledMarkdown.props.children
      : compiledMarkdown;
  } catch (err) {
    console.error(err);
    setParseError(true);
  }
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  useEffect(
    (): void => {
      if (!subpages[parsedLocationRoute]) {
        const tryRequest = async (): Promise<void> => {
          const controller: AbortController = new AbortController();
          const signal: AbortSignal = controller.signal;
          try {
            const res: Response = await fetch(
              `http://${window.location.hostname}:5002/api/get-subpage?route=${parsedLocationRoute}&language=${language}`,
              {
                method: "GET",
                signal: signal,
              },
            );
            const { displayTitle, title, content }: Subpage = await res.json();
            const displayTitleBoolean: boolean = displayTitle ? true : false;
            setDisplayTitle(displayTitleBoolean);
            setTitle(title);
            setMarkdown(content);
            const fixedSubpages: Subpages = { ...subpages };
            fixedSubpages[parsedLocationRoute] = {
              title: title,
              content: content,
              displayTitle: displayTitleBoolean,
            };
            setSubpages(fixedSubpages);
          } catch (err) {
            controller.abort();
          }
        };
        tryRequest();
      } else if (isParsedLocationValid) {
        const { displayTitle, title, content }: Subpage =
          subpages[parsedLocationRoute];
        setDisplayTitle(displayTitle);
        setTitle(title);
        setMarkdown(content);
      }
    },
    [
      parsedLocationRoute,
      language,
      setDisplayTitle,
      setTitle,
      setMarkdown,
      isParsedLocationValid,
      setSubpages,
      subpages,
    ],
  );
  const errorLink: string = isOnline
    ? t("quick-actions.report-issue")
    : "Zgłoś błąd";
  return (
    <Page title={title}>
      {!isParsedLocationValid || parseError
        ? <h2>
          {parseError
            ? "Wystąpił błąd podczas przetwarzania treści:"
            : "Podaj parametr route, żeby przenieść się do odpowiedniej podstrony:"}
        </h2>
        : displayTitle
        ? title === "" ? null : <h2>{`${title}:`}</h2>
        : null}
      <Section>
        {!isParsedLocationValid || parseError
          ? parseError
            ? <>
              <TextBlock
                value="Nie jesteśmy w stanie wyświetlić treści. Najprawdopodbniej błąd leży po stronie serwera."
              />
              <Link
                title={errorLink}
                href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues/1"
              />
            </>
            : <>
              <TextBlock value={firstLineErrorText} />
              <CodeBlock language="md" value={codeBlockValue}></CodeBlock>
              <TextBlock value={secondLineErrorText} />
              <Link
                href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
                title="Zgłoś błąd"
              />
            </>
          : compiledMarkdownRender}
      </Section>
    </Page>
  );
};

export default Subpage;
