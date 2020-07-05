import styled, { StyledComponent } from "styled-components";

interface PresentationSectionProps {}

type PresentationSectionType = StyledComponent<
  "div",
  any,
  PresentationSectionProps,
  never
>;

const PresentationSection: PresentationSectionType = styled.div<
  PresentationSectionProps
>`
  padding: 7.5px;
`;

export default PresentationSection;
