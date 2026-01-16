import { Priority } from './';
export declare function asyncComputed<T>(getter: () => Promise<T>, options?: {
    priority?: Priority;
}): (() => T | undefined) & {
    load: () => Promise<T> | null;
    invalidate: (priority?: Priority) => void;
    node: import("../devtools/graph").GraphNode;
};
