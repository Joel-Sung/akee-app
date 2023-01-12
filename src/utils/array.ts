import type { Key } from "react";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T | undefined) {
  if (orderBy === undefined) return 0;
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator(order: Order, orderBy: Key | undefined): 
  (a: { [key in Key]: number | string }, b: { [key in Key]: number | string },) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function sortObjectsByKey<T>(array: T[], key: keyof T, order: Order) {
  return array.sort((a, b) => {
    return order === 'asc' 
      ? a[key] > b[key] ? 1 : -1
      : a[key] < b[key] ? 1 : -1;
  });
}

export function zipCoords(arr1: any[], arr2: any[]) {
  return arr1.map((k, i) => {
    return {
      x: k, y: arr2[i]
    }
  });
}

export function addEmptyValues(arr: any[], length: number, value: any = 0) {
  return arr.length < length
    ? arr.concat(Array(length - arr.length).fill(value))
    : arr;
}
