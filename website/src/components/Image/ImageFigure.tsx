import styled, { StyledComponent } from "styled-components";

interface ImageFigureProps {}

type ImageFigureType = StyledComponent<"figure", any, ImageFigureProps, never>;

const ImageFigure: ImageFigureType = styled.figure<ImageFigureProps>`
  width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export default ImageFigure;
