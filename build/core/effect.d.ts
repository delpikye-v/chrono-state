import { Priority } from "intentx-core-z";
export declare function effect(fn: () => void | (() => void), priority?: Priority): () => void;
