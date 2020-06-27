import styled from 'styled-components';

interface PostWrapperProps {
  isDarkTheme: boolean;
  isLast?: boolean;
}

const PostWrapper = styled.div<PostWrapperProps>`
  cursor: pointer;
  height: 150px;
  width: 100%;
  display: flex;
  margin-bottom: ${({ isLast }) => isLast ? '0' : '15px'};
  &:hover {
    background: ${({ isDarkTheme }) => isDarkTheme ? '#333' : '#ddd'};
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default PostWrapper;