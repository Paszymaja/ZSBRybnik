import styled from "styled-components";

interface GalleryButtonProps {
  isDarkTheme: boolean;
}

const GalleryButton = styled.div<GalleryButtonProps>`
  height: 250px;
  border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "#ddd"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ isDarkTheme }) => isDarkTheme ? "#333" : "#ddd"};
    cursor: pointer;
  }
`;

export default GalleryButton;
