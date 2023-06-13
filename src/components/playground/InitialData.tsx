import { Position } from "reactflow";

export const InitialNodes = [
    {
        id: '1',
        type: 'type1',
        data: {
            label: 'Device',
            title: "Remote Device",
            subtitle: "user connected devices",
            icon: "Device",
            animated: true,
            themeColor: true,
            // onclick: handleClick
        },
        position: { x: 400, y: 350 },
    },
    {
        id: '2',
        type: 'type2',
        data: {
            label: 'Device',
            title: "AWS Server",
            subtitle: "EC2 Instance",
            icon: "Server",
            themeColor: false,
            animated: false,
            // onclick: handleClick
        },
        position: { x: 600, y: 450 },
        targetPosition: Position.Left,
    },
]

export const InitialEdges = [
    { id: 'e2-3', source: '1', target: '2', animated: true, type: "smoothstep" },
]