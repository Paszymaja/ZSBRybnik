import React from "react";
import Chart from "./Chart";
import { ChartComponentProps } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface MarkdownChartProps extends ChartComponentProps {}

const MarkdownChart = (
  props: MarkdownChartProps,
): JSX.Element => {
  let { data }: MarkdownChartProps = props;
  try {
    data = JSON.parse(`${data}}`) as ChartData;
  } catch (err) {}
  return (
    <Chart {...props} data={data} />
  );
};

export default MarkdownChart;
