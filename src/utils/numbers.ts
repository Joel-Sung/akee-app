export function shortenNumber(value: number) {
  return value > 1000000000
    ? (value / 1000000000).toFixed(2) + 'B'
    : value > 1000000
      ? (value / 1000000).toFixed(2) + 'M'
      : value > 1000
        ? (value / 1000).toFixed(2) + 'K'
        : value.toFixed(2);
}

export function toMoney(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
