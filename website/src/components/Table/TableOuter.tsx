import styled, { StyledComponent } from "styled-components";

interface TableOuterProps {}

type TableOuterType = StyledComponent<"div", any, TableOuterProps, never>;

const TableOuter: TableOuterType = styled
  .div<TableOuterProps>`
  width: 100%;
  overflow-x: auto;
  margin-left: auto;
  margin-right: auto;
`;

export default TableOuter;
