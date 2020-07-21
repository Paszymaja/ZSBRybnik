import React, {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Redirect, useHistory } from "react-router-dom";
import scrollTop from "../../other/scrollTop";
import PostWrapper from "./PostWrapper";
import PostImage from "./PostImage";
import PostTextWrapper from "./PostTextWrapper";
import PostTitle from "./PostTitle";
import PostHeader from "./PostHeader";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";

type redirectDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];

export interface PostProps {
  id: number;
  title: string;
  introduction: string;
  img?: string;
  imgAlt?: string;
  isLast?: boolean;
}

const Post: FC<PostProps> = (
  { id, title, introduction, img, imgAlt, isLast }: PostProps,
): JSX.Element => {
  const [redirect, setRedirect]: redirectDispatcher = useState(
    false,
  ) as redirectDispatcher;
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const path: string = `/post/${id}`;
  const history = useHistory();
  return (
    <PostWrapper
      isLast={isLast}
      isDarkTheme={isDarkTheme}
      onClick={(): void => {
        scrollTop();
        history.push(path);
        setRedirect(true);
      }}
    >
      <PostImage>
        <img
          loading="lazy"
          width="250px"
          height="250px"
          src={img}
          alt={imgAlt}
          title={imgAlt}
        />
      </PostImage>
      <PostTextWrapper>
        <PostTitle>
          {title}
        </PostTitle>
        <PostHeader>
          {introduction}
        </PostHeader>
      </PostTextWrapper>
      {redirect ? <Redirect to={path} /> : null}
    </PostWrapper>
  );
};

export default Post;
