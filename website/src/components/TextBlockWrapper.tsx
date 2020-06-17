import styled, { StyledComponent } from "styled-components";

interface TextBlockWrapperProps {}

const TextBlockWrapper: StyledComponent<
  "p",
  any,
  TextBlockWrapperProps,
  never
> = styled.p<TextBlockWrapperProps>`
  text-align: justify;
`;

export default TextBlockWrapper;
