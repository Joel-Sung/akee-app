import type { TimeRange } from "../types/collectionTypes/collectionTypes";
import { getLastCharater } from "./string";

export function getCurrentDate(): Date {
  return new Date();
}

export function dateToMilliSeconds(date: Date): number {
  return date.getTime();
}

export function milliSecondsToDate(ms: number): Date {
  return new Date(ms);
}

export function getDateMinusHours(date: Date, hours: number): Date {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - hours);
  return newDate;
}

export function getDateMinusDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
}

export function getDateMinusMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - months);
  return newDate;
}

export function getDateMinusYears(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() - years);
  return newDate;
}

export function get24HrTimeString(date: Date): string {
  return date.toLocaleString("en-GB", {timeStyle: 'short', hourCycle: 'h23'});
}

export function getDateString(date: Date): string {
  return date.toLocaleString("en-GB", {dateStyle: 'medium'});
}

export function getDateTimeString(date: Date): string {
  return date.toLocaleString("en-GB", {dateStyle: 'medium', timeStyle: 'short', hourCycle: 'h23'});
}

export function getDiffInMilliSeconds(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}

export function getDiffInMinutes(date1: Date, date2: Date): number {
  return getDiffInMilliSeconds(date1, date2) / 60000;
}

export function getDiffInHours(date1: Date, date2: Date): number {
  return getDiffInMinutes(date1, date2) / 60;
}

export function getDiffInDays(date1: Date, date2: Date): number {
  return getDiffInHours(date1, date2) / 24;
}

export function getDiffInMonths(date1: Date, date2: Date): number {
  return getDiffInDays(date1, date2) / 30;
}

export function getDiffInYears(date1: Date, date2: Date): number {
  return getDiffInMonths(date1, date2) / 12;
}

export function getDiffInDates(date1: Date, date2: Date): string {
  const diffInHours = getDiffInHours(date1, date2);
  const diffInMinutes = getDiffInMinutes(date1, date2);
  const diffInDays = getDiffInDays(date1, date2);
  const diffInMonths = getDiffInMonths(date1, date2);
  const diffInYears = getDiffInYears(date1, date2);

  if (diffInYears > 1) {
    return `${Math.floor(diffInYears)} years ago`;
  } else if (diffInYears < -1) {
    return `In ${-Math.floor(diffInYears)} years`;
  } else if (diffInMonths > 1) {
    return `${Math.floor(diffInMonths)} months ago`;
  } else if (diffInMonths < -1) {
    return `In ${-Math.floor(diffInMonths)} months`;
  } else if (diffInDays > 1) {
    return `${Math.floor(diffInDays)} days ago`;
  } else if (diffInDays < -1) {
    return `In ${-Math.floor(diffInDays)} days`;
  } else if (diffInHours > 1) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInHours < -1) {
    return `In ${-Math.floor(diffInHours)} hours`;
  } else if (diffInMinutes > 1) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  } else if (diffInMinutes < -1) {
    return `In ${-Math.floor(diffInMinutes)} minutes`;
  } else {
    return 'Just now';
  }
}

export function printMilliSecondsAsDate(ms: number, range: TimeRange): string {
  const date:Date = milliSecondsToDate(ms);
  return getLastCharater(range) === 'm' || getLastCharater(range) === 'h'
    ? get24HrTimeString(date)
    : getDateString(date);
}

export function msArrayToDateTimeStringArray(msArray: (number | null)[]): (string | null)[] {
  return msArray.map((ms) => {
    if (ms === null) return null;
    return getDateTimeString(milliSecondsToDate(ms))
  });
}

export function formatDateTimeAxisLabel(axisLabel: string | null | undefined, range: TimeRange): string | null | undefined {
  if (axisLabel === null || axisLabel === undefined) return axisLabel;
  return getLastCharater(range) === 'm' || getLastCharater(range) === 'h'
    ? axisLabel.substring(13)
    : axisLabel.substring(0,11);
}

export function dateStringToDate(dateString: string): Date {
  const timestamp = Date.parse(dateString);
  return new Date(timestamp);
}
