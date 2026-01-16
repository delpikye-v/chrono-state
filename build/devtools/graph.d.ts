export type NodeType = 'atom' | 'computed' | 'effect';
export type GraphNode = {
    id: number;
    name?: string;
    type: NodeType;
    value?: any;
    deps: Set<number>;
    highlighted?: boolean;
};
export type GraphSnapshotNode = {
    id: number;
    name?: string;
    type: NodeType;
    value?: any;
    deps: number[];
    highlighted?: boolean;
};
export declare function trackNode(type: NodeType, name?: string, value?: any): GraphNode;
export declare function linkNodes(from: GraphNode, to: GraphNode): void;
export declare function updateNodeValue(node: GraphNode, value: any): void;
export declare function getGraphSnapshot(): GraphSnapshotNode[];
export declare function highlightNode(id: number): void;
export declare function clearHighlights(): void;
export declare function resetGraph(): void;
