import styled from 'styled-components';

interface LinkContentWrapper {
  isDarkTheme: boolean;
}

const LinkContentWrapper = styled.div<LinkContentWrapper>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${({ isDarkTheme }) => isDarkTheme ? '#222' : '#eee'};
  border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? '#fff' : '#ddd'};
  padding: 7.5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: ${({ isDarkTheme }) => isDarkTheme ? '#333' : '#ddd'};
  }
`;

export default LinkContentWrapper;