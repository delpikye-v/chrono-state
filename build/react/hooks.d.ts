import { batch as coreBatch, Priority } from '../core';
export declare function scheduleReactJob(job: () => void, priority?: Priority): void;
export declare function useAtom<T>(getter: () => T): T;
export declare function useComputed<T>(fn: () => T): T;
export declare function useWatch<T>(getter: () => T, cb: (val: T) => void): void;
export declare function useBatch(): typeof coreBatch;
export declare function useEffectReact(fn: () => void, priority?: Priority): void;
