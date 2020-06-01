import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
  isDarkTheme: boolean;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ isDarkTheme }) => isDarkTheme ? '#333' : '#fff'};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ isDarkTheme }) => isDarkTheme ? '#111' : '#e05415'};
  }
  html {
    height: 100%;
    overflow: auto;
  }
  body {
    height: 100%;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    background: ${({ isDarkTheme }) => isDarkTheme ? '#333' : '#fff'};
    color: ${({ isDarkTheme }) => isDarkTheme ? '#fff' : '#111'};
  }
`;

export default GlobalStyle;