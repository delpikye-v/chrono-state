import { Priority } from "intentx-core-z";
export type AsyncAtom<T> = {
    (): T;
    set(v: T, p?: Priority): void;
    load(): Promise<T>;
    cancel(): void;
    invalidate(p?: Priority): void;
};
export declare function asyncAtom<T>(fetcher: (signal?: AbortSignal) => Promise<T>): AsyncAtom<T>;
