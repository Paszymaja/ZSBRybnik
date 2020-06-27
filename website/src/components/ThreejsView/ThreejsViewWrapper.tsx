import styled, { StyledComponent } from "styled-components";

interface ThreejsViewWrapperProps {}

const ThreejsViewWrapper: StyledComponent<
  "div",
  any,
  ThreejsViewWrapperProps,
  never
> = styled.div<ThreejsViewWrapperProps>`
  margin-left: auto;
  margin-right: auto;
  & > canvas {
    width: 100%;
    height: 100%;
  }
  @media all and (min-width: 768px) {
    width: 80%;
  }
`;

export default ThreejsViewWrapper;
