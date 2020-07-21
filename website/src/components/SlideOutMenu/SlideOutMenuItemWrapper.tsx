import styled from "styled-components";

interface SlideOutMenuItemWrapperProps {
  isDarkTheme: boolean;
}

const SlideOutMenuItemWrapper = styled.div<SlideOutMenuItemWrapperProps>`
  display: block;
  cursor: pointer;
  font-size: 24px;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  padding: 15px;
  color: #fff;
  &:hover {
    background: ${({ isDarkTheme }: SlideOutMenuItemWrapperProps): string =>
  isDarkTheme ? "#222" : "#c04504"};
  }
  > a {
    text-decoration: none;
    color: #fff;
  }
`;

export default SlideOutMenuItemWrapper;
