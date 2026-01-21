export declare function createSelector<T, R>(select: (state: T) => R, isEqual?: (a: R, b: R) => boolean): (state: T) => R;
