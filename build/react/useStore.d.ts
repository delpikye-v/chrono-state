export declare function useStore<S>(store: {
    state(): S;
    subscribe(fn: () => void): () => void;
}): S;
