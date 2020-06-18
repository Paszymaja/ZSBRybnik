import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  useContext,
} from "react";
import { ParsedQuery, parse } from "query-string";
import { useHistory } from "react-router-dom";
import { compiler } from "markdown-to-jsx";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import Page from "../components/Page";
import Section from "../components/Section";
import TextBlock from "../components/TextBlock";
import CodeBlock from "../components/CodeBlock";
import markdownOptions from "../other/makrdownOptions";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import GlobalContext, {
  GlobalContextCompleteValues,
  LanguageDispatcher,
} from "../stores/globalStore";

type MakePostRequest = () => void;
type TryRequest = () => Promise<void>;
type PostTitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type MarkdownDispatcher = [string, Dispatch<SetStateAction<string>>];
type ParsedLocationId = string | string[] | null | undefined;

interface Post {
  title: string;
  content: string;
  author: string;
}

interface PostPageProps {}

const PostPage: FC<PostPageProps> = (): JSX.Element => {
  const { languageDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [language]: LanguageDispatcher = languageDispatcher;
  const parsedLocation: ParsedQuery<string> = parse(window.location.search);
  const parsedLocationId: ParsedLocationId = parsedLocation.id;
  const isParsedLocationValid: boolean =
    parsedLocationId === undefined || parsedLocationId === null
      ? false
      : true;
  const [postTitle, setPostTitle]: PostTitleDispatcher = useState("");
  const [markdown, setMarkdown]: MarkdownDispatcher = useState("");
  const [author, setAuthor] = useState("");
  const { t }: UseTranslationResponse = useTranslation();
  const compiledMarkdown: JSX.Element = compiler(markdown, markdownOptions);
  const compiledMarkdownRender: JSX.Element = compiledMarkdown.key === "outer"
    ? compiledMarkdown.props.children
    : compiledMarkdown;
  const history = useHistory();
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  useEffect((): void => {
    const makePostRequest: MakePostRequest = (): void => {
      const controller: AbortController = new AbortController();
      const signal: AbortSignal = controller.signal;
      const tryRequest: TryRequest = async (): Promise<void> => {
        try {
          const res: Response = await fetch(
            `http://${window.location.hostname}:5002/api/get-post?id=${parsedLocationId}&language=${language}`,
            {
              method: "GET",
              signal: signal,
            },
          );
          const data: Post = await res.json();
          setPostTitle(data.title);
          setMarkdown(data.content);
          setAuthor(data.author);
        } catch (err) {
          controller.abort();
          setTimeout(tryRequest, 100);
        }
      };
      tryRequest();
    };
    makePostRequest();
  }, [parsedLocationId, setMarkdown, setPostTitle, language]);
  const codeBlockValue: string =
    `${window.location.origin}${window.location.pathname}&id=${
      t("post-page.idOfPost")
    }`;
  const firstLineErrorText: string =
    "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego numer posta. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string =
    "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const authorText: string = `${t("post-page.author")}: ${author}`;
  return (
    <Page title={postTitle}>
      <h2>
        {isParsedLocationValid === false
          ? "Podaj parametr id, żeby przenieść się do odpowiedniego posta:"
          : postTitle}
      </h2>
      <Section>
        {isParsedLocationValid
          ? <>
            {compiledMarkdownRender}
            {author ? <TextBlock value={authorText} /> : null}
          </>
          : <>
            <TextBlock value={firstLineErrorText} />
            <CodeBlock language="md" value={codeBlockValue}></CodeBlock>
            <TextBlock value={secondLineErrorText} />
          </>}
      </Section>
    </Page>
  );
};

export default PostPage;
