import styled, { StyledComponent } from "styled-components";

interface MobileBottomMenuWrapperProps {
  isDarkTheme: boolean;
}

type MobileBottomMenuWrapperType = StyledComponent<
  "div",
  any,
  MobileBottomMenuWrapperProps,
  never
>;

const MobileBottomMenuWrapper: MobileBottomMenuWrapperType = styled.div<
  MobileBottomMenuWrapperProps
>`
  box-shadow: ${({ isDarkTheme }: MobileBottomMenuWrapperProps): string =>
  isDarkTheme
    ? "0 14px 28px rgba(255, 255, 255, 0.25), 0 10px 10px rgba(255, 255, 255, 0.22)"
    : "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)"};
  height: 50px;
  width: 100vw;
  background: ${({ isDarkTheme }: MobileBottomMenuWrapperProps): string =>
  isDarkTheme ? "#111" : "#e05415"};
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  color: #fff;
  display: flex;
  align-items: center;
  > * {
    cursor: pointer;
    line-height: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    &:hover {
      background: ${({ isDarkTheme }: MobileBottomMenuWrapperProps): string =>
  isDarkTheme ? "#222" : "#c04504"};
    }
  }
`;

export default MobileBottomMenuWrapper;
