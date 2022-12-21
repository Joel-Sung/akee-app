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
  return date.toLocaleString("en-GB", {timeStyle: 'short', hourCycle: 'h24'});
}

export function getDateString(date: Date): string {
  return date.toLocaleString("en-GB", {dateStyle: 'medium'});
}