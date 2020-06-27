import styled, { StyledComponent } from "styled-components";

interface ThreejsViewLoaderLogoProps {
  isDarkTheme: boolean;
}

type ThreejsViewLoaderLogoType = StyledComponent<
  "img",
  any,
  ThreejsViewLoaderLogoProps,
  never
>;

const ThreejsViewLoaderLogo: ThreejsViewLoaderLogoType = styled.img<
  ThreejsViewLoaderLogoProps
>`
  background: ${({ isDarkTheme }: ThreejsViewLoaderLogoProps): string =>
  isDarkTheme ? "#fff" : "inherit"};
  border-radius: 25px;
`;

export default ThreejsViewLoaderLogo;
