import styled, { StyledComponent } from "styled-components";

interface SlideOutMenuHeightFixerProps {
  isDarkTheme: boolean;
}

type SlideOutMenuHeightFixerType = StyledComponent<
  "div",
  any,
  SlideOutMenuHeightFixerProps,
  never
>;

const SlideOutMenuHeightFixer: SlideOutMenuHeightFixerType = styled.div<
  SlideOutMenuHeightFixerProps
>`
  position: relative;
  top: 50px;
  overflow-y: auto;
  height: calc(100vh - 100px);
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ isDarkTheme }: SlideOutMenuHeightFixerProps): string =>
  isDarkTheme ? "#111" : "#e05415"};
  }
  @media all and (min-width: 768px) {
    height: calc(100vh - 50px);
  }
`;

export default SlideOutMenuHeightFixer;
