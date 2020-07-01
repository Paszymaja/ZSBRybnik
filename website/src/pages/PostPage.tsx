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
  IsOnlineDispatcher,
} from "../contextes/globalContext";
import Link from "../components/Link/Link";

type TryRequest = () => Promise<void>;
type PostTitleDispatcher = [string, Dispatch<SetStateAction<string>>];
type MarkdownDispatcher = [string, Dispatch<SetStateAction<string>>];
type AuthorDispatcher = [string, Dispatch<SetStateAction<string>>];
type ParseErrorDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];

interface PostPageProps {}

const PostPage: FC<PostPageProps> = (): JSX.Element => {
  const { languageDispatcher, postsDispatcher, isOnlineDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
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
  const [author, setAuthor]: AuthorDispatcher = useState("");
  const [parseError, setParseError]: ParseErrorDispatcher = useState(
    false,
  ) as ParseErrorDispatcher;
  const { t }: UseTranslationResponse = useTranslation();
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
  const firstLineErrorText: string = isOnline
    ? t("post-page.errorText")
    : "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego numer posta. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string = isOnline
    ? t("post-page.errorAnnotation")
    : "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const errorLink: string = isOnline
    ? t("quick-actions.report-issue")
    : "Zgłoś błąd";
  const authorText: string = `${t("post-page.author")}: ${author}`;
  return (
    <Page title={postTitle}>
      <h2>
        {!isParsedLocationValid || parseError
          ? parseError
            ? "Wystąpił błąd podczas przetwarzania treści:"
            : "Podaj parametr id, żeby przenieść się do odpowiedniego posta:"
          : postTitle}
      </h2>
      <Section>
        {isParsedLocationValid
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
              {compiledMarkdownRender}
              {author ? <TextBlock value={authorText} /> : null}
            </>
          : <>
            <TextBlock value={firstLineErrorText} />
            <CodeBlock language="md" value={codeBlockValue} />
            <TextBlock value={secondLineErrorText} />
            <Link
              title={errorLink}
              href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
            />
          </>}
      </Section>
    </Page>
  );
};

export default PostPage;
