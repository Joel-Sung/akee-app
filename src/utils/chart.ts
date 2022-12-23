import { TimeRange } from "../types/collectionTypes/collectionTypes";

const timeRangeTicks = {
  '5m': 5,
  '15m': 15,
  '30m': 6,
  '1h': 6,
  '6h': 6,
  '24h': 24,
  '7d': 7,
  '30d': 30,
  '3M': 12,
  '1y': 12,
  'all': 12,
}

export function getTimeRangeTickLimit(timeRange: TimeRange): number {
  return timeRangeTicks[timeRange];
}