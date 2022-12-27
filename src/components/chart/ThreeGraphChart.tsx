import { ChartTypeRegistry } from "chart.js";
import { Chart } from "react-chartjs-2";
import { getDateTimeString, milliSecondsToDate } from "../../utils/datetime";

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
  g3Label?: string;
  g3Type: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
  g3Data: any[];
  g3BorderColor?: string;
  g3BackgroundColor?: string;
  g3ShowLine?: boolean;
  x1Show?: boolean;
  y1Show?: boolean;
  x2Show?: boolean;
  y2Show?: boolean;
  x3Show?: boolean;
  y3Show?: boolean;
  x1Cat?: 'category' | 'linear' | 'logarithmic' | 'time' | 'timeseries' | undefined;
  x2Cat?: 'category' | 'linear' | 'logarithmic' | 'time' | 'timeseries' | undefined;
  x3Cat?: 'category' | 'linear' | 'logarithmic' | 'time' | 'timeseries' | undefined;
  x1TickLimit?: number;
  y1TickLimit?: number;
  x2TickLimit?: number;
  y2TickLimit?: number;
  x3TickLimit?: number;
  y3TickLimit?: number;
  showLegend?: boolean;
  showTitle?: boolean;
  x1AxisID?: 'x1' | 'x2' | 'x3';
  y1AxisID?: 'y1' | 'y2' | 'y3';
  x2AxisID?: 'x1' | 'x2' | 'x3';
  y2AxisID?: 'y1' | 'y2' | 'y3';
  x3AxisID?: 'x1' | 'x2' | 'x3';
  y3AxisID?: 'y1' | 'y2' | 'y3';
  x1Callback?: (value: any, index: any, values: any) => any;
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
    g3Label = "Graph3",
    g3Type,
    g3Data,
    g3BorderColor = "rgb(161, 39, 245)",
    g3BackgroundColor= "rgba(161, 39, 245, 0.5)",
    g3ShowLine = false,
    x1Show = true,
    y1Show = true,
    x2Show = false,
    y2Show = false,
    x3Show = false,
    y3Show = false,
    x1Cat = 'category',
    x2Cat = 'category',
    x3Cat = 'category',
    x1TickLimit = undefined,
    y1TickLimit = undefined,
    x2TickLimit = undefined,
    y2TickLimit = undefined,
    x3TickLimit = undefined,
    y3TickLimit = undefined,
    showLegend = true,
    showTitle = false,
    x1AxisID = 'x1',
    y1AxisID = 'y1',
    x2AxisID = 'x2',
    y2AxisID = 'y2',
    x3AxisID = 'x3',
    y3AxisID = 'y3',
    x1Callback = (value: any, index: any, values: any) => labels[index],
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
        xAxisID: x1AxisID,
        yAxisID: y1AxisID,
      },
      {
        label: g2Label,
        type: g2Type,
        data: g2Data,
        borderColor: g2BorderColor,
        backgroundColor: g2BackgroundColor,
        showLine: g2ShowLine,
        xAxisID: x2AxisID,
        yAxisID: y2AxisID,
      },
      {
        label: g3Label,
        type: g3Type,
        data: g3Data,
        borderColor: g3BorderColor,
        backgroundColor: g3BackgroundColor,
        showLine: g3ShowLine,
        xAxisID: x3AxisID,
        yAxisID: y3AxisID,
      },
    ],
  }

  const chartOptions = {
    maintainAspectRatio:false,
    plugins: {
      legend: {
        display: showLegend,
      },
      title: {
        display: showTitle,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return context.raw.x === undefined
              ? context.raw.y
              : '(' + getDateTimeString(milliSecondsToDate(context.raw.x)) + ', ' 
                + context.raw.y.toFixed(2) + ')';
          }
        }
      }
    },
    scales: {
      x1: {
        offset: x1Show,
        display: x1Show,
        type: x1Cat,
        ticks: {
          maxTicksLimit: x1TickLimit,
          callback: x1Callback
        },
      },
      y1: {
        offset: false,
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
        offset: false,
        display: y2Show,
        ticks: {
          maxTicksLimit: y2TickLimit,
        }
      },
      x3: {
        offset: x3Show,
        display: x3Show,
        type: x3Cat,
        ticks: {
          maxTicksLimit: x3TickLimit,
        }
      },
      y3: {
        offset: false,
        display: y3Show,
        ticks: {
          maxTicksLimit: y3TickLimit,
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
      axis: 'xy' as const
    },
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