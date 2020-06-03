import styled from 'styled-components';

interface SlideOutMenuHeightFixer {
  isDarkTheme: boolean;
}

const SlideOutMenuHeightFixer = styled.div<SlideOutMenuHeightFixer>`
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
    background: ${({ isDarkTheme }) => isDarkTheme ? '#111' : '#e05415'};
  }
  & > * {
    display: block;
    cursor: pointer;
    font-size: 24px;
    min-height: 50px;
    display: flex;
    align-items: center;
    height: auto;
    padding: 15px;
    color: #fff;
    &:hover {
      background: ${({ isDarkTheme }) => isDarkTheme ? '#222' : '#c04504'};
    }
  }
  @media all and (min-width: 768px) {
    height: calc(100vh - 50px);
  }
`;

export default SlideOutMenuHeightFixer;