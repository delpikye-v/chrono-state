export declare function createField<T>(initial: T, validate?: (v: T) => string | undefined): {
    state: import("../core").Atom<{
        value: T;
        touched: boolean;
    }>;
    error: () => string | undefined;
    setValue: (v: T) => void;
    touch: () => void;
};
