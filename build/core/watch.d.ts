import { Priority } from './scheduler';
export declare function watch<T>(getter: () => T, callback: (val: T) => void, priority?: Priority): () => void;
