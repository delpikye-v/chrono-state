import type { GraphNode } from '../devtools/graph';
export declare const effectContext: {
    activeNode: GraphNode | null;
    activeEffect: (() => void) | null;
};
