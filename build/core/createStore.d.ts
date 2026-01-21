import type { IntentHandler, Scope } from "intentx-core-z";
export type Subscriber = () => void;
export type Store<S extends object> = {
    scope: Scope;
    state(): S;
    setState(fn: (s: S) => void): void;
    subscribe(fn: Subscriber): () => void;
    emit(type: string, payload?: any): Promise<void>;
    on(type: string, handler: IntentHandler<S>): () => void;
};
export declare function createStore<S extends object>(initial: S, scope?: Scope): Store<S>;
