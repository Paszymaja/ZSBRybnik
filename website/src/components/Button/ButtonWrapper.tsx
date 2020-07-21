import styled from "styled-components";

interface ButtonWrapperProps {
  isDarkTheme: boolean;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  color: ${({ isDarkTheme }: ButtonWrapperProps): string =>
  isDarkTheme ? "#fff" : "#111"};
  width: 100%;
  user-select: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${({ isDarkTheme }: ButtonWrapperProps): string =>
  isDarkTheme ? "#222" : "#eee"};
  border: 1px solid ${({ isDarkTheme }: ButtonWrapperProps): string =>
  isDarkTheme ? "#fff" : "#ddd"};
  padding: 7.5px;
  cursor: pointer;
  &:hover {
    background: ${({ isDarkTheme }: ButtonWrapperProps): string =>
  isDarkTheme ? "#333" : "#ddd"};
  }
`;

export default ButtonWrapper;
