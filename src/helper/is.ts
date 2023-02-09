export const noop = () => {};
export const createTimestamp = () => +Date.now();
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))