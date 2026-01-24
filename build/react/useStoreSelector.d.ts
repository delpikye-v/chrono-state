export declare function useStoreSelector<S, R>(store: {
    state(): S;
    subscribe(fn: () => void): () => void;
}, selector: (state: S) => R, isEqual?: (a: R, b: R) => boolean): R;
