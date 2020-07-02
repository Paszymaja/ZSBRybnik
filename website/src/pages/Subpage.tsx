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
} from "../contextes/globalContext";
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
  const { t }: UseTranslationResponse = useTranslation();
  const parsedLocationRouteToFix: string | undefined = parsedLocation.route
    ?.toString();
  const parsedLocationRoute: string = parsedLocationRouteToFix
    ? parsedLocationRouteToFix
    : "";
  const isParsedLocationValid: boolean = parsedLocationRoute === ""
    ? false
    : true;
  const firstLineErrorText: string = isOnline
    ? t("subpage.first-line-error-text")
    : "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego podstronę. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string =
    "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const codeBlockValue: string =
    `${window.location.origin}${window.location.pathname}&route=nazwa-podstrony`;
  const [language]: LanguageDispatcher = languageDispatcher;
  const [markdown, setMarkdown]: MarkdownDispatcher = useState("");
  const [title, setTitle]: TitleDispatcher = useState("");
  const [notFoundError, setNotFoundError] = useState(false);
  const history = useHistory();
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
          const res: Response = await fetch(
            `http://${window.location.hostname}:5002/api/get-subpage?route=${parsedLocationRoute}&language=${language}`,
            {
              method: "GET",
              signal: signal,
            },
          );
          try {
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
            const { status }: Response = res;
            if (status === 404) {
              setNotFoundError(true);
            }
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
      {!isParsedLocationValid || parseError || notFoundError
        ? <h2>
          {parseError || notFoundError
            ? parseError
              ? "Wystąpił błąd podczas przetwarzania treści:"
              : "Nie znaleziono podstrony:"
            : "Podaj parametr route, żeby przenieść się do odpowiedniej podstrony:"}
        </h2>
        : displayTitle
        ? title === "" ? null : <h2>{`${title}:`}</h2>
        : null}
      <Section>
        {!isParsedLocationValid || parseError || notFoundError
          ? parseError || parseError
            ? parseError
              ? <>
                <TextBlock
                  value="Nie jesteśmy w stanie wyświetlić treści. Najprawdopodobniej błąd leży po stronie serwera."
                />
                <Link
                  title={errorLink}
                  href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
                />
              </>
              : <>
                <TextBlock
                  value="Niestety nie udało nam się odnaleźć podstrony skojarzonej z tym adresem. Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej."
                />
                <Link
                  title={errorLink}
                  href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
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
