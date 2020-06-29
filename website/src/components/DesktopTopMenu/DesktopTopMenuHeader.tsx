import styled, { StyledComponent } from "styled-components";

interface DesktopTopMenuHeaderProps {
  isDarkTheme: boolean;
}

type DesktopTopMenuHeaderType = StyledComponent<
  "header",
  any,
  DesktopTopMenuHeaderProps,
  never
>;

const DesktopTopMenuHeader: DesktopTopMenuHeaderType = styled.header<
  DesktopTopMenuHeaderProps
>`
  height: 50px;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  background: ${({ isDarkTheme }: DesktopTopMenuHeaderProps): string =>
  isDarkTheme ? "#111" : "#e05415"};
  & > * {
    cursor: pointer;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default DesktopTopMenuHeader;
