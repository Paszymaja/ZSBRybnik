import styled, { StyledComponent } from "styled-components";

interface ThreejsViewLoaderLogoProps {
  isDarkTheme: boolean;
}

const ThreejsViewLoaderLogo: StyledComponent<
  "img",
  any,
  ThreejsViewLoaderLogoProps,
  never
> = styled.img<ThreejsViewLoaderLogoProps>`
  background: ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "inherit"};
  border-radius: 25px;
`;

export default ThreejsViewLoaderLogo;
