import styled from "styled-components";

interface GalleryLogoProps {
  isDarkTheme: boolean;
}

const GalleryLogo = styled.img<GalleryLogoProps>`
  background: ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "inherit"};
  border-radius: 25px;
`;

export default GalleryLogo;
