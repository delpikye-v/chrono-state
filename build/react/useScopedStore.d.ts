export declare function useScopedStore<S>(store: {
    state(): S;
    subscribe(fn: () => void): () => void;
}): S;
