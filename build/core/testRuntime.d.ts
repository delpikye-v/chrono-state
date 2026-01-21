type Job = () => void;
export declare function createTestRuntime(): {
    schedule(job: Job): void;
    flushEffects(): void;
};
export {};
