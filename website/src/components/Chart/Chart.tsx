import React, { FC, useContext } from "react";
import ChartComponent, {
  ChartComponentProps,
} from "react-chartjs-2";
import ChartWrapper from "./ChartWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";

interface ChartProps extends ChartComponentProps {}

const Chart: FC<ChartProps> = (props: ChartProps): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  return (
    <ChartWrapper isDarkTheme={isDarkTheme}>
      <ChartComponent {...props} />
    </ChartWrapper>
  );
};

export default Chart;
