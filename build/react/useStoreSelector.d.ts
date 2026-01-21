export declare function useStoreSelector<S, T>(store: {
    state(): S;
    subscribe(fn: () => void): () => void;
}, selector: (state: S) => T, isEqual?: (a: T, b: T) => boolean): T;
