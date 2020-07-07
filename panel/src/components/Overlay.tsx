import styled, { StyledComponent } from "styled-components";

interface OverlayProps {
  isSlideOutMenuOpen: boolean;
}

type OverlayType = StyledComponent<"div", any, OverlayProps, never>;

const Overlay: OverlayType = styled.div<OverlayProps>`
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: .15;
  display: ${({ isSlideOutMenuOpen }: OverlayProps): string =>
  isSlideOutMenuOpen ? "block" : "none"};
  position: fixed;
  z-index: 1;
`;

export default Overlay;
