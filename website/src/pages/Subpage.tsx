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
import CodeBlock from "../components/CodeBlock";
import TextBlock from "../components/TextBlock";
import { compiler } from "markdown-to-jsx";
import markdownOptions from "../other/makrdownOptions";
import { useHistory } from "react-router-dom";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import Link from "../components/Link";
import GlobalContext, {
  GlobalContextCompleteValues,
  SubpagesDispatcher,
} from "../stores/globalStore";

type markdownDispatcher = [string, Dispatch<SetStateAction<string>>];

interface SubpageProps {}

const Subpage: FC<SubpageProps> = (): JSX.Element => {
  const { subpagesDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
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
  const { languageDispatcher } = useContext(GlobalContext);
  const [language] = languageDispatcher;
  const [markdown, setMarkdown]: markdownDispatcher = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory();
  const [displayTitle, setDisplayTitle] = useState(false);
  const compiledMarkdown: JSX.Element = compiler(markdown, markdownOptions);
  const compiledMarkdownRender: JSX.Element = compiledMarkdown.key === "outer"
    ? typeof compiledMarkdown.props.children === "string"
      ? compiledMarkdown
      : compiledMarkdown.props.children
    : compiledMarkdown;
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
            const data = await res.json();
            const displayTitleBoolean = data.displayTitle ? true : false;
            setDisplayTitle(displayTitleBoolean);
            setTitle(data.title);
            setMarkdown(data.content);
            const fixedSubpages = { ...subpages };
            fixedSubpages[parsedLocationRoute] = {
              title: data.title,
              content: data.content,
              displayTitle: displayTitleBoolean,
            };
            setSubpages(fixedSubpages);
          } catch (err) {
            controller.abort();
          }
        };
        tryRequest();
      } else if (isParsedLocationValid) {
        setDisplayTitle(
          subpages[parsedLocationRoute].displayTitle,
        );
        setTitle(subpages[parsedLocationRoute].title);
        setMarkdown(subpages[parsedLocationRoute].content);
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
  return (
    <Page title={title}>
      {isParsedLocationValid
        ? displayTitle ? <h2>{title === "" ? "" : `${title}:`}</h2> : null
        : <h2>
          Podaj parametr route, żeby przenieść się do odpowiedniej podstrony:
        </h2>}
      <Section>
        {isParsedLocationValid === true ? compiledMarkdownRender : <>
          <TextBlock value={firstLineErrorText} />
          <CodeBlock language="md" value={codeBlockValue}></CodeBlock>
          <TextBlock value={secondLineErrorText} />
          <Link
            href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
            title="Zgłoś błąd"
          />
        </>}
      </Section>
    </Page>
  );
};

export default Subpage;
