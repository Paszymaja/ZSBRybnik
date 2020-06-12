import React from "react";
import Chart from "../components/Chart";

interface MarkdownChartProps {
  type: "bar" | "line" | "pie" | "doughnut";
  data: string;
}

const MarkdownChart = ({ type, data }: MarkdownChartProps) => {
  const fixedData = JSON.parse(data);
  return (
    <Chart data={fixedData} type={type} />
  );
};

export default MarkdownChart;
