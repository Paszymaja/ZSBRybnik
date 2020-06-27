import styled, { StyledComponent } from "styled-components";

interface SectionProps {}

type SectionType = StyledComponent<"section", any, SectionProps, never>;

const Section: SectionType = styled.section<SectionProps>`
  padding: 7.5px;
  display: flex;
  flex-direction: column;
  &>* {
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    &:nth-child(1) {
      margin-top: 0;
    }
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
  iframe {
    width: 100%;
    min-height: calc(100vh - 135px);
  }
`;

export default Section;
