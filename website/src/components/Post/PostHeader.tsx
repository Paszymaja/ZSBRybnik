import styled, { StyledComponent } from "styled-components";

interface PostHeaderProps {}

type PostHeaderType = StyledComponent<"div", any, PostHeaderProps, never>;

const PostHeader: PostHeaderType = styled.div<PostHeaderProps>`
  display: none;
  height: 75px;
  width: 100%;
  font-size: 3.5vw;
  overflow: hidden;
  text-overflow: ellipsis;
  @media all and (min-width: 768px) {
    display: block;
    font-size: 16px;
  }
`;

export default PostHeader;
