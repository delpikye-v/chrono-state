export declare function useFactoryAtom<K, T>(factory: (key: K) => () => T, key: K): T;
