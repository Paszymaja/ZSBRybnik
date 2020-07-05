import styled, { StyledComponent } from "styled-components";

interface PresentationImageBlockProps {}

type PresentationImageBlockType = StyledComponent<
  "img",
  any,
  PresentationImageBlockProps,
  never
>;

const PresentationImageBlock: PresentationImageBlockType = styled.img<
  PresentationImageBlockProps
>`
  width: 5vw;
  height: auto;
`;

export default PresentationImageBlock;
