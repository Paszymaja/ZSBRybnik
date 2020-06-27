import styled from 'styled-components';

interface MainSectionProps { }

const MainSection = styled.main<MainSectionProps>`
  scroll-behavior: smooth;
  position: absolute;
  width: 100%;
  top: 50px;
  height: calc(100% - 100px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media all and (min-width: 768px) {
    height: calc(100% - 50px);
    &::-webkit-scrollbar {
      display: block;
    }
  }
`;

export default MainSection;