type Job = () => void;
export type Priority = 'high' | 'normal' | 'low';
export declare function schedule(job: Job, priority?: Priority): void;
export declare function scheduleCancelable(job: Job, priority?: Priority): () => void;
export {};
