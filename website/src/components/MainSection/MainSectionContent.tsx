import styled, { StyledComponent } from "styled-components";

interface MainSectionContentProps {}

type MainSectionContentType = StyledComponent<
  "div",
  any,
  MainSectionContentProps,
  never
>;

const MainSectionContent: MainSectionContentType = styled.div<
  MainSectionContentProps
>`
  display: flex;
`;

export default MainSectionContent;
