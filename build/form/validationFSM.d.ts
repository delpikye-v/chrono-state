export declare const validationFSM: {
    state: import("..").Atom<{
        status: string;
    }>;
    dispatch: (type: string, payload?: any) => Promise<void>;
};
