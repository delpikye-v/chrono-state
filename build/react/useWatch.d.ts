import type { WatchOptions } from "../core/watch";
export declare function useWatch<T>(getter: () => T, fn: (val: T) => void, options?: WatchOptions<T>): void;
