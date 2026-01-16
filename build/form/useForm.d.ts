export declare function useForm<T extends Record<string, any>>(schema: {
    [K in keyof T]: {
        initial: T[K];
        validate?: (val: T[K]) => string | null | Promise<string | null>;
    };
}): {
    fields: Record<keyof T, any>;
    setField: (key: keyof T, value: any) => void;
    isValid: () => Promise<boolean>;
    values: () => T;
    submit: () => Promise<T>;
};
