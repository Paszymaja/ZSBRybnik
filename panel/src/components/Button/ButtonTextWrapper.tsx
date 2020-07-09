import styled, { StyledComponent } from "styled-components";

interface ButtonTextWrapperProps {}

type ButtonTextWrapperType = StyledComponent<
  "div",
  any,
  ButtonTextWrapperProps,
  never
>;

const ButtonTextWrapper: ButtonTextWrapperType = styled.div<
  ButtonTextWrapperProps
>`
  margin-bottom: 10px;
`;

export default ButtonTextWrapper;
