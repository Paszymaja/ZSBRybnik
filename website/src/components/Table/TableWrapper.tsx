import styled, { StyledComponent } from "styled-components";

interface TableWrapperProps {
  isDarkTheme: boolean;
}

type TableWrapperType = StyledComponent<"table", any, TableWrapperProps, never>;

const TableWrapper: TableWrapperType = styled.table<TableWrapperProps>`
  border: 1px solid ${({ isDarkTheme }: TableWrapperProps): string =>
  isDarkTheme ? "#fff" : "#ddd"};
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border: 1px solid ${({ isDarkTheme }: TableWrapperProps): string =>
  isDarkTheme ? "#fff" : "#ddd"};
    padding: 15px;
    text-align: center;
  }
`;

export default TableWrapper;
