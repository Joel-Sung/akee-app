import { ChartTypeRegistry } from "chart.js";
import { Chart } from "react-chartjs-2";

export type graphDataType = {
  label?: string;
  type: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
  data: any[];
  borderColor?: string;
  backgroundColor?: string;
  showLine?: boolean;
}

export type graphOptionsType = {
  show?: boolean;
  cat?: 'category' | 'linear' | 'logarithmic' | 'time' | 'timeseries' | undefined;
  tickLimit?: number;
}

interface MultipleGraphChartProps {
  chartType: keyof ChartTypeRegistry;
  labels: any[];
  showLegend?: boolean;
  showTitle?: boolean;
  graphData: graphDataType[];
  graphOptions: graphOptionsType[];
}
export default function MultipleGraphChart(props: MultipleGraphChartProps) {
  const {
    chartType,
    labels,
    showLegend = true,
    showTitle = false,
    graphData,
    graphOptions
  } = props;
  
  const chartScales = {
    scales: {}
  }
  graphOptions.forEach((options, index) => {
    const graphScales = {
      ['x' + index.toString()]: {
        offset: options.show,
        display: options.show,
        type: options.cat,
        ticks: {
          maxTicksLimit: options.tickLimit,
        }
      },
      ['y' + index.toString()]: {
        offset: options.show,
        display: options.show,
      },
    }
    chartScales.scales = {
      ...chartScales.scales,
      ...graphScales
    }
  });
  const chartData = {
    labels: labels,
    datasets: graphData,
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: showLegend,
      },
      title: {
        display: showTitle,
      },
    },
    scales: {
      ...chartScales.scales
    }
  }

  return (
    <Chart
      type={chartType}
      data={chartData}
      options={chartOptions}
    />
  )
}