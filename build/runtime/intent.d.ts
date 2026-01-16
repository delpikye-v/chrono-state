import { Atom } from '../core';
export type Intent<P = any> = {
    type: string;
    payload?: P;
};
export declare function createIntentBus<S>(): {
    on<K extends string, P>(type: K, fn: (ctx: {
        state: S;
        intent: Intent<P>;
        setState: (v: S) => void;
    }) => void): void;
    dispatch<P>(state: Atom<S>, intent: Intent<P>): void;
};
