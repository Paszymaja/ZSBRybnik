import styled, { StyledComponent } from "styled-components";

interface GalleryButtonProps {
  isDarkTheme: boolean;
}

type GalleryButtonType = StyledComponent<"div", any, GalleryButtonProps, never>;

const GalleryButton: GalleryButtonType = styled.div<GalleryButtonProps>`
  height: 250px;
  border: 1px solid ${({ isDarkTheme }: GalleryButtonProps): string =>
  isDarkTheme ? "#fff" : "#ddd"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ isDarkTheme }: GalleryButtonProps): string =>
  isDarkTheme ? "#333" : "#ddd"};
    cursor: pointer;
  }
`;

export default GalleryButton;
