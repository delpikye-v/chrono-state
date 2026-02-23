import type { WatchOptions } from "intentx-state-z";
export declare function useWatch<T>(getter: () => T, fn: (val: T) => void, options?: WatchOptions<T>): void;
