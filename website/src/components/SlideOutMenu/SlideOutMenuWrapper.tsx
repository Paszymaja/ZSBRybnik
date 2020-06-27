import styled from 'styled-components';

interface SlideOutMenuWrapperProps {
  isDarkTheme: boolean;
  isSlideOutMenuOpen: boolean;
}

const SlideOutMenuWrapper = styled.nav<SlideOutMenuWrapperProps>`
  height: calc(100vh - 50px);
  width: 100vw;
  background: ${({ isDarkTheme }) => isDarkTheme ? '#111' : '#e05415'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  user-select: none;
  transition: ${({ isSlideOutMenuOpen }) => isSlideOutMenuOpen ? 'left .5s' : 'left 0s'};
  left: ${({ isSlideOutMenuOpen }) => isSlideOutMenuOpen ? '0' : '-100vw'};
  @media all and (min-width: 768px) {
    width: 350px;
    height: 100vh;
  }
`;

export default SlideOutMenuWrapper;