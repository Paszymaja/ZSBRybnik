import styled, { StyledComponent } from "styled-components";

interface TableWrapperProps {
  isDarkTheme: boolean;
}

const TableWrapper: StyledComponent<"table", any, TableWrapperProps, never> =
  styled.table<TableWrapperProps>`
  border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "#ddd"};
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border: 1px solid ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "#ddd"};
    padding: 15px;
    text-align: center;
  }
`;

export default TableWrapper;
