import React, { FC, useContext, useCallback, lazy, Suspense } from "react";
import Page from "../components/Page";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import GlobalContext, {
  GlobalContextCompleteValues,
  PostsListDispatcher,
  ToSubtractDispatcher,
  IsOnlineDispatcher,
  LanguageDispatcher,
} from "../contextes/globalContext";
import { PostProps } from "../components/Post/Post";
import VisibilitySensor from "react-visibility-sensor";
import VisibilityDetector from "../components/VisibilityDetector";

const Post = lazy(() => import("../components/Post/Post"));

type TryRequest = () => Promise<void>;
type MakePostsRequest = (isVisibleProp: boolean) => void;

export interface MainPageProps {}

const MainPage: FC<MainPageProps> = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();
  const {
    postsListDispatcher,
    toSubtractDispatcher,
    isOnlineDispatcher,
    languageDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [posts, setPosts]: PostsListDispatcher = postsListDispatcher;
  const [
    toSubtract,
    setToSubtract,
  ]: ToSubtractDispatcher = toSubtractDispatcher;
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const [language]: LanguageDispatcher = languageDispatcher;
  const title: string = isOnline ? t("pages.home") : "Strona główna";
  const makePostsRequest: MakePostsRequest = useCallback(
    (isVisibleProp: boolean): void => {
      if (isVisibleProp || posts.length === 0) {
        const tryRequest: TryRequest = async (): Promise<void> => {
          try {
            const res: Response = await fetch(
              `${process.env.REACT_APP_API_URL}/api/get-posts?toSubtract=${toSubtract}&language=${language}`
            );
            const data: PostProps[] = await res.json();
            setPosts([...posts, ...data]);
            setToSubtract(toSubtract + 10);
          } catch (err) {}
        };
        tryRequest();
      }
    },
    [setPosts, posts, toSubtract, language, setToSubtract]
  );
  let postKey: number = 0;
  return (
    <Page title={title}>
      {posts &&
        posts.map((post: PostProps, key: number) => {
          let isLast: boolean;
          if (posts.length === key + 1) {
            isLast = true;
          } else {
            isLast = false;
          }
          const postEl: JSX.Element = (
            <Suspense fallback={<></>} key={postKey}>
              <Post
                isLast={isLast}
                key={postKey}
                id={post.id}
                title={post.title}
                img={post.img}
                introduction={post.introduction}
                imgAlt={post.imgAlt}
              />
            </Suspense>
          );
          postKey++;
          return postEl;
        })}
      <VisibilitySensor onChange={makePostsRequest}>
        <VisibilityDetector />
      </VisibilitySensor>
    </Page>
  );
};

export default MainPage;
