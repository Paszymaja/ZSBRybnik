import styled from 'styled-components';

interface OverlayProps {
  isSlideOutMenuOpen: boolean;
}

const Overlay = styled.div<OverlayProps>`
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: .15;
  display: ${({ isSlideOutMenuOpen }) => isSlideOutMenuOpen ? 'block' : 'none'};
  position: fixed;
  z-index: 1;
`;

export default Overlay;