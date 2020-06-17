import styled, { StyledComponent } from "styled-components";

interface VisibilityDetectorProps {}

const VisibilityDetector: StyledComponent<
  "div",
  any,
  VisibilityDetectorProps,
  never
> = styled.div<VisibilityDetectorProps>`
  height: 1px;
  margin-top: -1px;
`;

export default VisibilityDetector;
