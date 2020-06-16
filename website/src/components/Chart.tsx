import React, { FC, useContext } from "react";
import { Doughnut, Bar, Line, Pie, ChartData } from "react-chartjs-2";
import ChartWrapper from "./ChartWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../stores/globalStore";

interface ChartProps {
  type: "bar" | "line" | "pie" | "doughnut";
  data: ChartData<Chart.ChartData>;
}

const Chart: FC<ChartProps> = ({ type, data }: ChartProps): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  if (type === "doughnut") {
    return (
      <ChartWrapper isDarkTheme={isDarkTheme}>
        <Doughnut
          data={data}
        />
      </ChartWrapper>
    );
  } else if (type === "bar") {
    return (
      <ChartWrapper isDarkTheme={isDarkTheme}>
        <Bar
          data={data}
        />
      </ChartWrapper>
    );
  } else if (type === "line") {
    return (
      <ChartWrapper isDarkTheme={isDarkTheme}>
        <Line
          data={data}
        />
      </ChartWrapper>
    );
  } else if (type === "pie") {
    return (
      <ChartWrapper isDarkTheme={isDarkTheme}>
        <Pie
          data={data}
        />
      </ChartWrapper>
    );
  } else {
    return (<></>);
  }
};

export default Chart;
