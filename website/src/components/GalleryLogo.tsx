import styled from "styled-components";

interface GalleryLogoProps {
  isDarkTheme: boolean;
}

const GalleryLogo = styled.img<GalleryLogoProps>`
  background: ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "inherit"};
  border-radius: 25px;
  max-width: fit-content;
  width: 40%;
  height: auto;
  max-height: fit-content;
`;

export default GalleryLogo;
