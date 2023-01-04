import { TimeRange } from "../types/collectionTypes/collectionTypes";

const timeRangeTicks = {
  '5m': 5,
  '15m': 15,
  '30m': 6,
  '1h': 6,
  '6h': 6,
  '12h': 12,
  '24h': 24,
  '7d': 7,
  '30d': 30,
  '3M': 12,
  '1y': 12,
  'all': 12,
  '' : 12,
}

export function getTimeRangeTickLimit(timeRange: TimeRange): number {
  return timeRangeTicks[timeRange];
}

const timeRangeText = {
  '5m': '5M',
  '15m': '15M',
  '30m': '30M',
  '1h': '1H',
  '6h': '6H',
  '12h': '12H',
  '24h': '24H',
  '7d': '7D',
  '30d': '30D',
  '3M': '3M',
  '1y': '1Y',
  'all': 'ALL',
  '' : 'ALL',
}

export function printTimeRange(timeRange: TimeRange): string {
  return timeRangeText[timeRange];
}
