import { Priority } from "intentx-core-z";
export type Atom<T> = (() => T) & {
    set(v: T, p?: Priority): void;
    subscribe(fn: () => void): () => void;
};
export declare function atom<T>(initial: T): Atom<T>;
