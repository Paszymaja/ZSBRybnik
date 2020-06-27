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
import TextBlock from "../components/TextBlock/TextBlock";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import markdownOptions from "../other/makrdownOptions";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import GlobalContext, {
  GlobalContextCompleteValues,
  LanguageDispatcher,
  PostsDispatcher,
  Post,
  Posts,
} from "../stores/globalStore";

type TryRequest = () => Promise<void>;
type PostTitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type MarkdownDispatcher = [string, Dispatch<SetStateAction<string>>];

interface PostPageProps {}

const PostPage: FC<PostPageProps> = (): JSX.Element => {
  const { languageDispatcher, postsDispatcher }: GlobalContextCompleteValues =
    useContext(
      GlobalContext,
    );
  const [language]: LanguageDispatcher = languageDispatcher;
  const [posts, setPosts]: PostsDispatcher = postsDispatcher;
  const parsedLocation: ParsedQuery<string> = parse(window.location.search);
  const parsedLocationIdToFix: string | undefined = parsedLocation.id
    ?.toString();
  const parsedLocationId: number = parsedLocationIdToFix
    ? parseInt(parsedLocationIdToFix)
    : NaN;
  const isParsedLocationValid: boolean = isNaN(parsedLocationId) ? false : true;
  const [postTitle, setPostTitle]: PostTitleDispatcher = useState("");
  const [markdown, setMarkdown]: MarkdownDispatcher = useState("");
  const [author, setAuthor] = useState("");
  const { t }: UseTranslationResponse = useTranslation();
  const compiledMarkdown: JSX.Element = compiler(markdown, markdownOptions);
  const compiledMarkdownRender: JSX.Element = compiledMarkdown.key === "outer"
    ? typeof compiledMarkdown.props.children === "string"
      ? compiledMarkdown
      : compiledMarkdown.props.children
    : compiledMarkdown;
  const history = useHistory();
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  useEffect(
    (): void => {
      if (!posts[parsedLocationId]) {
        const tryRequest: TryRequest = async (): Promise<void> => {
          const controller: AbortController = new AbortController();
          const signal: AbortSignal = controller.signal;
          try {
            const res: Response = await fetch(
              `http://${window.location.hostname}:5002/api/get-post?id=${parsedLocationId}&language=${language}`,
              {
                method: "GET",
                signal: signal,
              },
            );
            const { title, content, author }: Post = await res.json();
            setPostTitle(title);
            setMarkdown(content);
            setAuthor(author);
            const fixedPosts: Posts = { ...posts };
            fixedPosts[parsedLocationId] = {
              title: title,
              content: content,
              author: author,
            };
            setPosts(fixedPosts);
          } catch (err) {
            controller.abort();
          }
        };
        tryRequest();
      } else if (isParsedLocationValid) {
        const { author, title, content }: Post = posts[parsedLocationId];
        setAuthor(author);
        setPostTitle(title);
        setMarkdown(content);
      }
    },
    [
      parsedLocationId,
      setMarkdown,
      setPostTitle,
      language,
      posts,
      setPosts,
      isParsedLocationValid,
    ],
  );
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
