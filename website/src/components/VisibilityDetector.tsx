import styled, { StyledComponent } from "styled-components";

interface VisibilityDetectorProps {}

type VisibilityDetectorType = StyledComponent<
  "div",
  any,
  VisibilityDetectorProps,
  never
>;

const VisibilityDetector: VisibilityDetectorType = styled.div<
  VisibilityDetectorProps
>`
  height: 1px;
  margin-top: -1px;
`;

export default VisibilityDetector;
