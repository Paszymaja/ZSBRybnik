import styled, { StyledComponent } from "styled-components";

interface TikTokWrapperProps {}

type TikTokWrapperType = StyledComponent<"div", any, TikTokWrapperProps, never>;

const TikTokWrapper: TikTokWrapperType = styled.div<TikTokWrapperProps>`
  overflow: auto;
`;

export default TikTokWrapper;
