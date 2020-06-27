import styled, { StyledComponent } from "styled-components";

interface TextBlockWrapperProps {}

type TextBlockWrapperType = StyledComponent<
  "p",
  any,
  TextBlockWrapperProps,
  never
>;

const TextBlockWrapper: TextBlockWrapperType = styled.p<TextBlockWrapperProps>`
  text-align: justify;
`;

export default TextBlockWrapper;
