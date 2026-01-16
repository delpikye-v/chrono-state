import { Priority } from './scheduler';
export type Atom<T> = (() => T) & {
    set: (v: T, p?: Priority) => void;
};
export declare function atom<T>(initial: T): Atom<T>;
