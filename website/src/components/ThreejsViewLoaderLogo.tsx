import styled from "styled-components";

interface ThreejsViewLoaderLogoProps {
  isDarkTheme: boolean;
}

const ThreejsViewLoaderLogo = styled.img<ThreejsViewLoaderLogoProps>`
  background: ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "inherit"};
  border-radius: 25px;
`;

export default ThreejsViewLoaderLogo;
