import { Priority } from './scheduler';
export declare function effect(fn: () => void, priority?: Priority): () => void;
