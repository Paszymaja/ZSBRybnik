import React, { FC, useState, Dispatch, SetStateAction, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import scrollTop from '../other/scrollTop';
import PostWrapper from './PostWrapper';
import PostImage from './PostImage';
import PostTextWrapper from './PostTextWrapper';
import PostTitle from './PostTitle';
import PostHeader from './PostHeader';
import GlobalContext from '../stores/globalStore';

type redirectDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];

export interface PostProps {
  id: number;
  title: string;
  introduction: string;
  img?: string;
  imgAlt?: string;
}

const Post: FC<PostProps> = (props: PostProps): JSX.Element => {
  const { id, title, introduction, img, imgAlt }: PostProps = props;
  const [redirect, setRedirect]: redirectDispatcher = useState(false) as redirectDispatcher;
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const path: string = `/post?id=${id}`;
  const history = useHistory();
  return (
    <PostWrapper isDarkTheme={isDarkTheme} onClick={(): void => {
      scrollTop();
      history.push(path);
      setRedirect(!redirect);
    }}>
      <PostImage>
        <img loading="lazy" width="250px" height="250px" src={img} alt={imgAlt} title={imgAlt} />
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