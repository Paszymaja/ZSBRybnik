import styled, { StyledComponent } from "styled-components";

interface LinkContentWrapperProps {
  isDarkTheme: boolean;
}

type LinkContentWrapperType = StyledComponent<
  "div",
  any,
  LinkContentWrapperProps,
  never
>;

const LinkContentWrapper: LinkContentWrapperType = styled.div<
  LinkContentWrapperProps
>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${({ isDarkTheme }: LinkContentWrapperProps): string =>
  isDarkTheme ? "#222" : "#eee"};
  border: 1px solid ${({ isDarkTheme }: LinkContentWrapperProps): string =>
  isDarkTheme ? "#fff" : "#ddd"};
  padding: 7.5px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: ${({ isDarkTheme }: LinkContentWrapperProps): string =>
  isDarkTheme ? "#333" : "#ddd"};
  }
`;

export default LinkContentWrapper;
