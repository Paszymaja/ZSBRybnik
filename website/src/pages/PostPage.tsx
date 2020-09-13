import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  FC,
  useContext,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import { compiler } from "markdown-to-jsx";
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

interface PostPageRouteProps {
  id: string;
}

export interface PostPageProps
  extends RouteComponentProps<PostPageRouteProps> {}

const PostPage: FC<PostPageProps> = ({
  match: {
    params: { id },
  },
}: PostPageProps): JSX.Element => {
  const {
    languageDispatcher,
    postsDispatcher,
    isOnlineDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const [language]: LanguageDispatcher = languageDispatcher;
  const [posts, setPosts]: PostsDispatcher = postsDispatcher;
  const parsedLocationId: number = id ? parseInt(id) : NaN;
  const isParsedLocationValid: boolean = isNaN(parsedLocationId) ? false : true;
  const [postTitle, setPostTitle]: PostTitleDispatcher = useState("");
  const [author, setAuthor]: AuthorDispatcher = useState("");
  const [parseError, setParseError]: ParseErrorDispatcher = useState(
    false
  ) as ParseErrorDispatcher;
  const [notFoundError, setNotFoundError] = useState(false);
  const { t }: UseTranslationResponse = useTranslation();
  const [compiledMarkdownRender, setCompiledMarkdownRender] = useState(<></>);
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
    if (!posts[parsedLocationId] && isParsedLocationValid) {
      const tryRequest: TryRequest = async (): Promise<void> => {
        const controller: AbortController = new AbortController();
        const signal: AbortSignal = controller.signal;
        const res: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-post?id=${parsedLocationId}&language=${language}`,
          {
            method: "GET",
            signal: signal,
          }
        );
        try {
          const { title, content, author }: Post = await res.json();
          setMarkdown(content);
          setPostTitle(title);
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
          const { status }: Response = res;
          if (status === 404) {
            setNotFoundError(true);
          }
        }
      };
      tryRequest();
    } else if (isParsedLocationValid) {
      const { author, title, content }: Post = posts[parsedLocationId];
      setMarkdown(content);
      setAuthor(author);
      setPostTitle(title);
    }
  }, [
    parsedLocationId,
    setPostTitle,
    language,
    posts,
    setPosts,
    isParsedLocationValid,
    setNotFoundError,
    setParseError,
  ]);
  const codeBlockValue: string = `${window.location.origin}${
    window.location.pathname
  }/${isOnline ? t("post-page.id-of-post") : "numerPosta"}`;
  const firstLineErrorText: string = isOnline
    ? t("post-page.error-text")
    : "Nie jesteśmy w stanie wyświetlić zawartości, jeśli nie podałeś parametru określającego numer posta. Proszę uzupełnij URL o ten parametr.";
  const secondLineErrorText: string = isOnline
    ? t("post-page.error-annotation")
    : "Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const errorLink: string = isOnline
    ? t("quick-actions.report-issue")
    : "Zgłoś błąd";
  const authorText: string = `${t("post-page.author")}: ${author}`;
  return (
    <Page title={postTitle}>
      <h2>
        {!isParsedLocationValid || parseError || notFoundError
          ? parseError || notFoundError
            ? parseError
              ? "Wystąpił błąd podczas przetwarzania treści:"
              : "Nie znaleziono posta:"
            : "Podaj parametr, żeby przenieść się do odpowiedniego posta:"
          : postTitle}
      </h2>
      <Section>
        {!isParsedLocationValid || parseError || notFoundError ? (
          parseError || notFoundError ? (
            parseError ? (
              <>
                <TextBlock value="Nie jesteśmy w stanie wyświetlić treści. Najprawdopodobniej błąd leży po stronie serwera." />
                <Link
                  title={errorLink}
                  href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
                />
              </>
            ) : (
              <>
                <TextBlock value="Niestety nie udało nam się odnaleźć postu skojarzonego z tym adresem. Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej." />
                <Link
                  title={errorLink}
                  href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
                />
              </>
            )
          ) : (
            <>
              <TextBlock value={firstLineErrorText} />
              <CodeBlock language="md" value={codeBlockValue} />
              <TextBlock value={secondLineErrorText} />
              <Link
                title={errorLink}
                href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
              />
            </>
          )
        ) : (
          <>
            {compiledMarkdownRender}
            {author ? <TextBlock value={authorText} /> : null}
          </>
        )}
      </Section>
    </Page>
  );
};

export default PostPage;
