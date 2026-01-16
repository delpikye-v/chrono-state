import { Atom } from './atom';
export declare function asyncAtom<T>(fetcher: () => Promise<T>): Atom<T | undefined> & {
    load: () => Promise<T>;
    cancel: () => void;
};
