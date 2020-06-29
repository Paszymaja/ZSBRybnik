import styled, { StyledComponent } from "styled-components";

interface ChartWrapperProps {
  isDarkTheme: boolean;
}

type ChartWrapperType = StyledComponent<"div", any, ChartWrapperProps, never>;

const ChartWrapper: ChartWrapperType = styled.div<ChartWrapperProps>`
  background: ${({ isDarkTheme }: ChartWrapperProps): string =>
  isDarkTheme ? "#fff" : "#eee"};
  padding: 15px;
`;

export default ChartWrapper;
