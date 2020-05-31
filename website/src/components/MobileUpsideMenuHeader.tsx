import styled from 'styled-components';

interface MobileUpsideMenuHeaderProps {
  isDarkTheme: boolean;
}

const MobileUpsideMenuHeader = styled.header<MobileUpsideMenuHeaderProps>`
  height: 50px;
  color: #fff;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 3;
  background: ${({ isDarkTheme }) => isDarkTheme ? '#111' : '#e05415'};
  font-size: 5vw;
`;

export default MobileUpsideMenuHeader;