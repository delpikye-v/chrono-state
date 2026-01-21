export declare function useAtomSelector<T, R>(atom: () => T, selector: (value: T) => R, isEqual?: (a: R, b: R) => boolean): R;
