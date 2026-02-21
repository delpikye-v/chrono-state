import type { Signal } from "intentx-core-z";
export type AtomOptions<T> = {
    equals?: (a: T, b: T) => boolean;
};
export type AtomMiddleware<T> = (next: T, prev: T) => T;
export declare function createAtomFactory(signal: <T>(v: T) => Signal<T>): <T>(initial: T, options?: AtomOptions<T>) => import("./createBaseAtom").Atom<T>;
export declare function createAtomWithMiddlewareFactory(signal: <T>(v: T) => Signal<T>): <T>(initial: T, middleware?: AtomMiddleware<T>) => import("./createBaseAtom").Atom<T>;
