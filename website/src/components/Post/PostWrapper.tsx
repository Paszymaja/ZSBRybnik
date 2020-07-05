import styled, { StyledComponent } from "styled-components";

interface PostWrapperProps {
  isDarkTheme: boolean;
  isLast?: boolean;
}

type PostWrapperType = StyledComponent<"div", any, PostWrapperProps, never>;

const PostWrapper: PostWrapperType = styled.div<PostWrapperProps>`
  cursor: pointer;
  height: 150px;
  width: 100%;
  display: flex;
  margin-bottom: ${({ isLast }: PostWrapperProps): string =>
  isLast ? "0" : "15px"};
  &:hover {
    background: ${({ isDarkTheme }: PostWrapperProps): string =>
  isDarkTheme ? "#333" : "#ddd"};
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default PostWrapper;
