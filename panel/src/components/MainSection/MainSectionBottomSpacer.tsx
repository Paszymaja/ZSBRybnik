import styled, { StyledComponent } from "styled-components";

interface MainSectionBottomSpacerProps {}

type MainSectionBottomSpacerType = StyledComponent<
  "div",
  any,
  MainSectionBottomSpacerProps,
  never
>;

const MainSectionBottomSpacer: MainSectionBottomSpacerType = styled.div<
  MainSectionBottomSpacerProps
>`
  height: 15px;
  display: none;
  @media all and (min-width: 768px) {
    display: block;
  }
`;

export default MainSectionBottomSpacer;
