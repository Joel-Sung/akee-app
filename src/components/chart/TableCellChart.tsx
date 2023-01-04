import { ChartTypeRegistry } from "chart.js";
import { Chart } from "react-chartjs-2";

interface TableCellChartProps {
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
export default function TableCellChart(props: TableCellChartProps) {
  const {
    chartType,
    labels,
    label = "Graph", 
    data,
    borderColor = "rgb(112, 181, 225)",
    backgroundColor = "rgba(112, 181, 225, 0.5)",
    showLine = false,
    xShow = false,
    yShow = false,
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
        offset: true,
        display: xShow,
        type: xCat,
        ticks: {
          maxTicksLimit: xTickLimit,
        }
      },
      y: {
        offset: false,
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
