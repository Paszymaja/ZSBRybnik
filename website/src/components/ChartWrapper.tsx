import styled, { StyledComponent } from "styled-components";

interface ChartWrapperProps {
  isDarkTheme: boolean;
}

const ChartWrapper: StyledComponent<"div", any, ChartWrapperProps, never> =
  styled.div<ChartWrapperProps>`
  background: ${({ isDarkTheme }: ChartWrapperProps) =>
    isDarkTheme ? "#fff" : "#eee"};
  padding: 15px;
`;

export default ChartWrapper;
