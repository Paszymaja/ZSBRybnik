import styled, { StyledComponent } from "styled-components";

interface MobileColorThemeButtonWrapperProps {}

type MobileColorThemeButtonWrapperType = StyledComponent<
  "div",
  any,
  MobileColorThemeButtonWrapperProps,
  never
>;

const MobileColorThemeButtonWrapper: MobileColorThemeButtonWrapperType = styled
  .div<
  MobileColorThemeButtonWrapperProps
>`
  height: 50px;
  width: 50px;
  position: fixed;
  z-index: 3;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default MobileColorThemeButtonWrapper;
