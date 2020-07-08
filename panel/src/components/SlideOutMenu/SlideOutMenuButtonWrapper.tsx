import styled, { StyledComponent } from "styled-components";

interface SlideOutMenuButtonWrapperProps {}

type SlideOutMenuButtonWrapperType = StyledComponent<
  "div",
  any,
  SlideOutMenuButtonWrapperProps,
  never
>;

const SlideOutMenuButtonWrapper: SlideOutMenuButtonWrapperType = styled.div<
  SlideOutMenuButtonWrapperProps
>`
  height: 50px;
  width: 50px;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default SlideOutMenuButtonWrapper;
