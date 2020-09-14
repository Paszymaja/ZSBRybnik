import styled, { StyledComponent } from "styled-components";

interface PresentationBlockProps {
  centered?: boolean;
  isDarkTheme: boolean;
}

type PresentationBlockType = StyledComponent<
  "div",
  any,
  PresentationBlockProps,
  never
>;

const PresentationBlock: PresentationBlockType = styled.div<
  PresentationBlockProps
>`
  margin-top: 15px;
  background: ${({ isDarkTheme }: PresentationBlockProps): string =>
    isDarkTheme ? "#222" : "#eee"};
  padding: 15px;
  text-align: ${({ centered }: PresentationBlockProps): string =>
    centered ? "center" : "left"};
  &:first-child {
    margin-top: 0;
  }
`;

export default PresentationBlock;
