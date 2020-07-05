import styled, { StyledComponent } from "styled-components";

interface ImageFigcaptionProps {}

type ImageFigcaptionType = StyledComponent<
  "figcaption",
  any,
  ImageFigcaptionProps,
  never
>;

const ImageFigcaption: ImageFigcaptionType = styled.figcaption<
  ImageFigcaptionProps
>`
  font-size: 10px;
`;

export default ImageFigcaption;
