import { ChartTypeRegistry } from "chart.js";
import { Chart } from "react-chartjs-2";

interface TwoGraphChartProps {
  chartType: keyof ChartTypeRegistry;
  labels: any[];
  g1Label?: string;
  g1Type: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
  g1Data: any[];
  g1BorderColor?: string;
  g1BackgroundColor?: string;
  g1ShowLine?: boolean;
  g2Label?: string;
  g2Type: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
  g2Data: any[];
  g2BorderColor?: string;
  g2BackgroundColor?: string;
  g2ShowLine?: boolean;
  x1Show?: boolean;
  y1Show?: boolean;
  x2Show?: boolean;
  y2Show?: boolean;
  x1Cat?: 'category' | 'linear' | 'logarithmic' | 'time' | 'timeseries' | undefined;
  x2Cat?: 'category' | 'linear' | 'logarithmic' | 'time' | 'timeseries' | undefined;
  x1TickLimit?: number;
  y1TickLimit?: number;
  x2TickLimit?: number;
  y2TickLimit?: number;
  showLegend?: boolean;
  showTitle?: boolean;
}
export default function TwoGraphChart(props: TwoGraphChartProps) {
  const {
    chartType,
    labels,
    g1Label = "Graph1", 
    g1Type,
    g1Data,
    g1BorderColor = "rgb(255, 99, 132)",
    g1BackgroundColor = "rgba(255, 99, 132, 0.5)",
    g1ShowLine = false,
    g2Label = "Graph2",
    g2Type,
    g2Data,
    g2BorderColor = "rgb(112, 181, 225)",
    g2BackgroundColor= "rgba(112, 181, 225, 0.5)",
    g2ShowLine = false,
    x1Show = true,
    y1Show = true,
    x2Show = false,
    y2Show = false,
    x1Cat = 'category',
    x2Cat = 'category',
    x1TickLimit = undefined,
    y1TickLimit = undefined,
    x2TickLimit = undefined,
    y2TickLimit = undefined,
    showLegend = true,
    showTitle = false,
  } = props;
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: g1Label,
        type: g1Type,
        data: g1Data,
        borderColor: g1BorderColor,
        backgroundColor: g1BackgroundColor,
        showLine: g1ShowLine,
        xAxisID: 'x1',
        yAxisID: 'y1',
      },
      {
        label: g2Label,
        type: g2Type,
        data: g2Data,
        borderColor: g2BorderColor,
        backgroundColor: g2BackgroundColor,
        showLine: g2ShowLine,
        xAxisID: 'x2',
        yAxisID: 'y2',
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
      x1: {
        offset: x1Show,
        display: x1Show,
        type: x1Cat,
        ticks: {
          maxTicksLimit: x1TickLimit,
        }
      },
      y1: {
        offset: y1Show,
        display: y1Show,
        ticks: {
          maxTicksLimit: y1TickLimit,
        }
      },
      x2: {
        offset: x2Show,
        display: x2Show,
        type: x2Cat,
        ticks: {
          maxTicksLimit: x2TickLimit,
        }
      },
      y2: {
        offset: y2Show,
        display: y2Show,
        ticks: {
          maxTicksLimit: y2TickLimit,
        }
      }
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