import styled, { StyledComponent } from "styled-components";

interface ContentWrapperProps {
  isDarkTheme: boolean;
}

type ContentWrapperType = StyledComponent<
  "div",
  any,
  ContentWrapperProps,
  never
>;

const ContentWrapper: ContentWrapperType = styled.div<ContentWrapperProps>`
  margin: 0;
  height: fit-content;
  background: ${({ isDarkTheme }: ContentWrapperProps): string =>
  isDarkTheme ? "#222" : "#eee"};
  padding: 15px;
  width: 100%;
  h1, h2, h3, h4, h5, h6 {
    font-family: "Catamaran", sans-serif;
  }
  @media all and (min-width: 768px) {
    width: calc(75% - 15px);
    padding: 15px;
    margin: 15px auto 0px 15px;
  }
`;

export default ContentWrapper;
