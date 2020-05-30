import { createGlobalStyle } from 'styled-components';

interface GlobalStyleProps {
  isDarkTheme: boolean;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ::-webkit-scrollbar-thumb {
    background: ${({ isDarkTheme }) => isDarkTheme ? '#111' : '#e05415'};
  }
  body {
    color: ${({ isDarkTheme }) => isDarkTheme ? '#fff' : '#111'};
  }
`;

export default GlobalStyle;