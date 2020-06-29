import styled, { StyledComponent } from "styled-components";

interface GalleryLogoProps {
  isDarkTheme: boolean;
}

type GalleryLogoType = StyledComponent<"img", any, GalleryLogoProps, never>;

const GalleryLogo: GalleryLogoType = styled.img<GalleryLogoProps>`
  background: ${({ isDarkTheme }: GalleryLogoProps): string =>
  isDarkTheme ? "#fff" : "inherit"};
  border-radius: 25px;
  max-width: fit-content;
  width: 40%;
  height: auto;
  max-height: fit-content;
`;

export default GalleryLogo;
