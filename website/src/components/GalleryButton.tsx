import styled, { StyledComponent } from "styled-components";

interface GalleryButtonProps {
  isDarkTheme: boolean;
}

const GalleryButton: StyledComponent<"div", any, GalleryButtonProps, never> =
  styled.div<GalleryButtonProps>`
  height: 250px;
  border: 1px solid ${({ isDarkTheme }: GalleryButtonProps) =>
    isDarkTheme ? "#fff" : "#ddd"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ isDarkTheme }: GalleryButtonProps) =>
    isDarkTheme ? "#333" : "#ddd"};
    cursor: pointer;
  }
`;

export default GalleryButton;
