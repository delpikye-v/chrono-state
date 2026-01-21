import type { Priority } from "intentx-core-z";
export declare function watch<T>(getter: () => T, fn: (value: T) => void, priority?: Priority): () => void;
