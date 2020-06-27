import styled, { StyledComponent } from "styled-components";

interface ThreejsViewWrapperProps {}

type ThreejsViewWrapperType = StyledComponent<
  "div",
  any,
  ThreejsViewWrapperProps,
  never
>;

const ThreejsViewWrapper: ThreejsViewWrapperType = styled.div<
  ThreejsViewWrapperProps
>`
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
