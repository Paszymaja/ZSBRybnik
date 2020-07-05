import styled, { StyledComponent } from "styled-components";

interface GalleryWrapperProps {}

type GalleryWrapperType = StyledComponent<
  "div",
  any,
  GalleryWrapperProps,
  never
>;

const GalleryWrapper: GalleryWrapperType = styled.div<GalleryWrapperProps>`
  &>* {
    margin: 0;
  }
`;

export default GalleryWrapper;
