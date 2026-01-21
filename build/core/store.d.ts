import type { IntentHandler } from "intentx-core-z";
export type Subscriber = () => void;
export type Store<S extends object> = {
    state(): S;
    setState(fn: (s: S) => void): void;
    subscribe(fn: Subscriber): () => void;
    emit(intent: string, payload?: any): Promise<void>;
    on(intent: string, handler: IntentHandler<S>): () => void;
};
