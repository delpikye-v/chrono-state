import { Atom } from '../core';
export declare function useField<T>(initial: T, validate?: (val: T) => string | null): {
    value: Atom<T>;
    error: Atom<string | null>;
};
