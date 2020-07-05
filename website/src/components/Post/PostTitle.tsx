import styled, { StyledComponent } from "styled-components";

interface PostTitleProps {}

type PostTitleType = StyledComponent<"div", any, PostTitleProps, never>;

const PostTitle: PostTitleType = styled.div<PostTitleProps>`
  margin-top: 5px;
  line-height: 5.6vw;
  font-size: 5.6vw;
  height: 150px;
  width: 100%;
  font-family: "Catamaran", sans-serif;
  font-weight: 700;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media all and (min-width: 768px) {
    margin-top: 0;
    height: 75px;
    line-height: 75px;
    font-size: 32px;
    white-space: nowrap;
  }
`;

export default PostTitle;
