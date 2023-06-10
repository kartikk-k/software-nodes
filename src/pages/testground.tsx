import { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Position, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        data: { label: 'Node 1' },
        position: { x: 100, y: 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '2',
        data: { label: 'Node 2' },
        position: { x: 300, y: 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];

const initialEdges: any = [];

const TouchDeviceFlow = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((connection: any) => setEdges((eds) => addEdge(connection, eds)), []);

    return (
        <div className='w-screen h-screen'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                className="touchdevice-flow"
                fitView
            />
        </div>
    );
};

export default TouchDeviceFlow;
