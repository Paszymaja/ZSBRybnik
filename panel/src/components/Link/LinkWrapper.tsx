import styled, { StyledComponent } from "styled-components";

interface LinkWrapperProps {
  isDarkTheme: boolean;
}

type LinkWrapperType = StyledComponent<"a", any, LinkWrapperProps, never>;

const LinkWrapper: LinkWrapperType = styled.a<LinkWrapperProps>`
  text-decoration: none;
  color: ${({ isDarkTheme }: LinkWrapperProps): string =>
  isDarkTheme ? "#fff" : "#111"};
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

export default LinkWrapper;
