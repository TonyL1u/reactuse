export const noop = () => {};
export const createTimestamp = () => +Date.now();
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K => Object.prototype.hasOwnProperty.call(val, key);