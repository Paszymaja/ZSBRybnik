import styled, { StyledComponent } from "styled-components";

interface PresentationImageBlockWrapperProps {}

type PresentationImageBlockWrapperType = StyledComponent<
  "img",
  any,
  PresentationImageBlockWrapperProps,
  never
>;

const PresentationImageBlockWrapper: PresentationImageBlockWrapperType = styled.img<
  PresentationImageBlockWrapperProps
>`
  width: 5vw;
  height: auto;
`;

export default PresentationImageBlockWrapper;
