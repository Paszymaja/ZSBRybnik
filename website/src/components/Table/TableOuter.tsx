import styled, { StyledComponent } from "styled-components";

interface TableOuterProps {}

const TableOuter: StyledComponent<"div", any, TableOuterProps, never> = styled
  .div<TableOuterProps>`
  width: 100%;
  overflow-x: auto;
  margin-left: auto;
  margin-right: auto;
`;

export default TableOuter;
