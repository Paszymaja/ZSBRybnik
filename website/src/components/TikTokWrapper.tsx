import styled, { StyledComponent } from "styled-components";

interface TikTokWrapperProps {}

const TikTokWrapper: StyledComponent<"div", any, TikTokWrapperProps, never> =
  styled.div<TikTokWrapperProps>`
  overflow: auto;
`;

export default TikTokWrapper;
