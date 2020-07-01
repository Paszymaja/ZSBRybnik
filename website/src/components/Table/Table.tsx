import React, { FC, ReactNode, useContext } from "react";
import TableOuter from "./TableOuter";
import GlobalContext from "../../contextes/globalContext";
import TableWrapper from "./TableWrapper";

interface TableProps {
  children: ReactNode;
}

const Table: FC<TableProps> = (props: TableProps): JSX.Element => {
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  return (
    <TableOuter>
      <TableWrapper isDarkTheme={isDarkTheme}>
        <tbody>{props.children}</tbody>
      </TableWrapper>
    </TableOuter>
  );
};

export default Table;
