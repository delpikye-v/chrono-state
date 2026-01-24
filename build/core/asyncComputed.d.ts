import type { Priority } from "intentx-core-z";
export type AsyncComputed<T> = {
    (): T;
    invalidate(p?: Priority): void;
};
export declare function asyncComputed<T>(getter: (signal?: AbortSignal) => Promise<T>, priority?: Priority): AsyncComputed<T>;
