import styled, { StyledComponent } from "styled-components";

interface PresentationContentFitImageBlockProps {}

type PresentationContentFitImageBlockType = StyledComponent<
  "img",
  any,
  PresentationContentFitImageBlockProps,
  never
>;

const PresentationContentFitImageBlock: PresentationContentFitImageBlockType =
  styled.img<
    PresentationContentFitImageBlockProps
  >`
  max-width: fit-content;
  width: 100%;
  height: auto;
`;

export default PresentationContentFitImageBlock;
