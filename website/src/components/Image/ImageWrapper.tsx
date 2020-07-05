import styled, { StyledComponent } from "styled-components";

interface ImageWrapperProps {}

type ImageWrapperType = StyledComponent<"img", any, ImageWrapperProps, never>;

const ImageWrapper: ImageWrapperType = styled.img<ImageWrapperProps>`
  width: fit-content;
  max-width: 100%;
  height: auto;
`;

export default ImageWrapper;
