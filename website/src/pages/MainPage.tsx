import React, {
  FC,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
} from "react";
import Page from "../components/Page";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import GlobalContext from "../stores/globalStore";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import { useHistory } from "react-router-dom";
import Post, { PostProps } from "../components/Post";
import VisibilitySensor from "react-visibility-sensor";
import VisibilityDetector from "../components/VisibilityDetector";

type toSubtractDispatcher = [number, Dispatch<SetStateAction<number>>];
type postsDispatcher = [PostProps[], Dispatch<SetStateAction<PostProps[]>>];
type TryRequest = () => Promise<void>;
type MakePostsRequest = (isVisibleProp: boolean) => void;

interface MainPageProps {}

const MainPage: FC<MainPageProps> = (): JSX.Element => {
  const history = useHistory();
  const { t }: UseTranslationResponse = useTranslation();
  const { isOnlineDispatcher } = useContext(GlobalContext);
  const [toSubtract, setToSubtract]: toSubtractDispatcher = useState(0);
  const [posts, setPosts]: postsDispatcher = useState([] as PostProps[]);
  const [isOnline] = isOnlineDispatcher;
  const title: string = isOnline ? t("pages.home") : "Strona główna";
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  const makePostsRequest: MakePostsRequest = useCallback(
    (isVisibleProp: boolean): void => {
      if (isVisibleProp) {
        const tryRequest: TryRequest = async (): Promise<void> => {
          const controller: AbortController = new AbortController();
          const signal: AbortSignal = controller.signal;
          try {
            const res: Response = await fetch(
              `http://${window.location.hostname}:5002/api/get-posts?toSubtract=${toSubtract}`,
              {
                method: "GET",
                signal: signal,
              },
            );
            const data: PostProps[] = await res.json();
            setPosts([...posts, ...data]);
            setToSubtract(toSubtract + 10);
          } catch (err) {
            controller.abort();
          }
        };
        tryRequest();
      }
    },
    [setPosts, posts, toSubtract],
  );
  let postKey: number = 0;
  return (
    <Page title={title}>
      {posts && posts.map((post: PostProps, key: number) => {
        let isLast: boolean;
        if (posts.length === key + 1) {
          isLast = true;
        } else {
          isLast = false;
        }
        const postEl: JSX.Element = <Post
          isLast={isLast}
          key={postKey}
          id={post.id}
          title={post.title}
          img={post.img}
          introduction={post.introduction}
          imgAlt={post.imgAlt}
        />;
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
