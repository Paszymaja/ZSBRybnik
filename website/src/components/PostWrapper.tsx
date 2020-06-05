import styled from 'styled-components';

interface PostWrapperProps {
  isDarkTheme: boolean;
}

const PostWrapper = styled.div<PostWrapperProps>`
  cursor: pointer;
  height: 150px;
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  &:hover {
    background: ${({ isDarkTheme }) => isDarkTheme ? '#333' : '#ddd'};
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export default PostWrapper;