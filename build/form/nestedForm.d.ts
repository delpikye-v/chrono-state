import { Atom } from "../core";
export type FieldState<T> = {
    value: T;
    error: string | null;
};
export type FieldSchema<T> = {
    initial: T;
    validate?: (val: T) => string | null | Promise<string | null>;
};
export declare function createNestedForm<T extends Record<string, any>>(schema: {
    [K in keyof T]: FieldSchema<T[K]>;
}): {
    fields: { [K in keyof T]: Atom<FieldState<T[K]>>; };
    values: () => T;
    isValid: () => Promise<boolean>;
    setField: <K_1 extends keyof T>(key: K_1, value: T[K_1]) => void;
    submit: () => Promise<T>;
};
