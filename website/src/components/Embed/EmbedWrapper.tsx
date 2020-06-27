import styled, { StyledComponent } from "styled-components";

interface EmbedWrapperProps {}

const EmbedWrapper: StyledComponent<"div", any, EmbedWrapperProps, never> =
  styled.div<EmbedWrapperProps>`
  overflow: auto;
  position: relative;
  text-align: center;
  * {
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden;
    margin: 0 auto !important;
  }
`;

export default EmbedWrapper;
