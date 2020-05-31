import styled from 'styled-components';

interface DesktopTopMenuHeaderProps {
  isDarkTheme: boolean;
}

const DesktopTopMenuHeader = styled.header<DesktopTopMenuHeaderProps>`
  height: 50px;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  background: ${({ isDarkTheme }) => isDarkTheme ? '#111' : '#e05415'};
  & > * {
    cursor: pointer;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default DesktopTopMenuHeader;