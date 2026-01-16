import { Atom } from '../core';
export declare function createFSM<S extends {
    status: string;
}>(config: {
    initial: S;
    states: Record<S['status'], {
        on?: Record<string, (ctx: {
            state: S;
            payload?: any;
        }) => S | Promise<S>>;
    }>;
}): {
    state: Atom<S>;
    dispatch: (type: string, payload?: any) => Promise<void>;
};
