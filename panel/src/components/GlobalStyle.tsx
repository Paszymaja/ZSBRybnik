import {
  createGlobalStyle,
  GlobalStyleComponent,
  DefaultTheme,
} from "styled-components";

interface GlobalStyleProps {
  isDarkTheme: boolean;
}

type GlobalStyleType = GlobalStyleComponent<GlobalStyleProps, DefaultTheme>;

const GlobalStyle: GlobalStyleType = createGlobalStyle<GlobalStyleProps>`
  *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ isDarkTheme }: GlobalStyleProps): string =>
  isDarkTheme ? "#333" : "#fff"};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ isDarkTheme }: GlobalStyleProps): string =>
  isDarkTheme ? "#111" : "#e05415"};
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
    background: ${({ isDarkTheme }: GlobalStyleProps): string =>
  isDarkTheme ? "#333" : "#fff"};
    color: ${({ isDarkTheme }: GlobalStyleProps): string =>
  isDarkTheme ? "#fff" : "#111"};
    a {
      text-decoration: none;
    }
  }
`;

export default GlobalStyle;
