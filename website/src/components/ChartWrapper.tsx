import styled from "styled-components";

interface ChartWrapperProps {
  isDarkTheme: boolean;
}

const ChartWrapper = styled.div<ChartWrapperProps>`
  background: ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "#eee"};
  padding: 15px;
`;

export default ChartWrapper;
