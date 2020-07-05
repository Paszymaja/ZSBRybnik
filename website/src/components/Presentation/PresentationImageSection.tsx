import styled, { StyledComponent } from "styled-components";

interface PresentationImageSectionProps {}

type PresentationImageSectionType = StyledComponent<
  "div",
  any,
  PresentationImageSectionProps,
  never
>;

const PresentationImageSection: PresentationImageSectionType = styled.div<
  PresentationImageSectionProps
>`
  margin-top: 10px;
`;

export default PresentationImageSection;
