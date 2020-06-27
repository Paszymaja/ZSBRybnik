import styled, { StyledComponent } from "styled-components";

interface GalleryLogoProps {
  isDarkTheme: boolean;
}

const GalleryLogo: StyledComponent<"img", any, GalleryLogoProps, never> = styled
  .img<GalleryLogoProps>`
  background: ${({ isDarkTheme }: GalleryLogoProps) =>
  isDarkTheme ? "#fff" : "inherit"};
  border-radius: 25px;
  max-width: fit-content;
  width: 40%;
  height: auto;
  max-height: fit-content;
`;

export default GalleryLogo;
