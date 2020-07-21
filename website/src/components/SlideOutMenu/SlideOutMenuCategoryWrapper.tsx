import styled from "styled-components";

interface SlideOutMenuCategoryWrapperProps {
  isDarkTheme: boolean;
}

const SlideOutMenuCategoryWrapper = styled.div<SlideOutMenuCategoryWrapperProps>
  `
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 24px;
  min-height: 50px;
  height: auto;
  padding: 15px;
  color: #fff;
  &:hover {
    background: ${({ isDarkTheme }: SlideOutMenuCategoryWrapperProps): string =>
    isDarkTheme ? "#222" : "#c04504"};
  }
  > a {
    color: #fff;
  }
`;

export default SlideOutMenuCategoryWrapper;
