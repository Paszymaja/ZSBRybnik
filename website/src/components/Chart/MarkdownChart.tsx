import React from "react";
import Chart from "./Chart";
import { ChartData } from "react-chartjs-2";

interface MarkdownChartProps {
  type: "bar" | "line" | "pie" | "doughnut";
  data: string;
}

const MarkdownChart = ({ type, data }: MarkdownChartProps): JSX.Element => {
  const fixedData: ChartData<Chart.ChartData> = JSON.parse(`${data}}`);
  return (
    <Chart data={fixedData} type={type} />
  );
};

export default MarkdownChart;
