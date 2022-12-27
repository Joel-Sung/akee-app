import { ChartTypeRegistry } from "chart.js";
import { Chart } from "react-chartjs-2";

interface OneGraphChartProps {
  chartType: keyof ChartTypeRegistry;
  labels: any[];
  label?: string;
  data: any[];
  borderColor?: string;
  backgroundColor?: string;
  showLine?: boolean;
  xShow?: boolean;
  yShow?: boolean;
  xCat?: 'category' | 'linear' | 'logarithmic' | 'time' | 'timeseries' | undefined;
  xTickLimit?: number;
  yTickLimit?: number;
  showLegend?: boolean;
  showTitle?: boolean;
}
export default function OneGraphChart(props: OneGraphChartProps) {
  const {
    chartType,
    labels,
    label = "Graph", 
    data,
    borderColor = "rgb(255, 99, 132)",
    backgroundColor = "rgba(255, 99, 132, 0.5)",
    showLine = false,
    xShow = true,
    yShow = true,
    xCat = 'category',
    xTickLimit = undefined,
    yTickLimit = undefined,
    showLegend = false,
    showTitle = false,
  } = props;
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        type: chartType,
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        showLine: showLine,
        xAxisID: 'x',
        yAxisID: 'y',
      },
    ],
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
      x: {
        offset: xShow,
        display: xShow,
        type: xCat,
        ticks: {
          maxTicksLimit: xTickLimit,
        }
      },
      y: {
        offset: yShow,
        display: yShow,
        ticks: {
          maxTicksLimit: yTickLimit,
        }
      }
    }
  }

  return (
    <Chart
      type={chartType}
      data={chartData}
      options={chartOptions}
      height='100%'
    />
  )
}