"use client"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Node, addEdge, SelectionMode, Panel, MiniMap, ControlButton, Controls, MarkerType, Background, Edge, Connection, useNodesState, useEdgesState, BackgroundVariant } from "reactflow"
import 'reactflow/dist/style.css';
import { Position } from 'reactflow';
import { CircleStackIcon, CloudIcon, ComputerDesktopIcon, CpuChipIcon, CubeIcon, FolderIcon, ServerStackIcon, WindowIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import Type1 from "@/components/nodes/Type1";
import Type2 from "@/components/nodes/Type2";
import CustomEdge from "@/components/edges/CustomEdge";
import Dock from "@/components/Dock";
import FormInput from "@/components/ui/form/FormInput";
import Head from "next/head";
import Appwrite from "@/components/branding/Appwrite";
import Header from "@/components/Header/Header";
import NodeEditor from "@/components/NodeEditor";
import { appwriteAccount, databases } from "../../../appwrite/appwriteConfig";
import { ID } from "appwrite";
import { stringify, toJSON, parse } from "flatted";


const Icons = [
    { id: 1, label: "Device", icon: <ComputerDesktopIcon /> },
    { id: 2, label: "Server", icon: <ServerStackIcon /> },
    { id: 3, label: "Database", icon: <CircleStackIcon /> },
    { id: 4, label: "CPU/Chip", icon: <CpuChipIcon /> },
    { id: 5, label: "Container", icon: <CubeIcon /> },
    { id: 6, label: "Folders", icon: <FolderIcon /> },
    { id: 7, label: "Cloud", icon: <CloudIcon /> },
    { id: 8, label: "Window/Browser", icon: <WindowIcon /> }
]


export default function Playground() {

    const databaseId = "6483cd1f01c3f40565a4"
    const collectionId = "6483cd47e4a0caa617fe"
    const documentId = "6483cdb73a2990410f04"

    const initialEdges = [
        { id: 'e2-3', source: '1', target: '2', animated: true, type: "smoothstep" },
    ]

    const initialNodes: Node[] = [
        {
            id: '1',
            type: 'type1',
            data: {
                label: 'Device',
                title: "Remote Device",
                subtitle: "user connected devices",
                icon: <ComputerDesktopIcon />,
                animated: true,
                themeColor: true,
                onclick: handleClick
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
                icon: <ServerStackIcon />,
                themeColor: false,
                animated: false,
                onclick: handleClick
            },
            position: { x: 600, y: 450 },
            targetPosition: Position.Left,
        },
    ]


    const [activeNode, setActiveNode] = useState<string | null>(null)
    const [activeNodeData, setActiveNodeData] = useState<Node | null>(null)
    const [activeNodeIcon, setActiveNodeIcon] = useState<(number)>()
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<object>(initialEdges);
    const [variant, setVariant] = useState<BackgroundVariant | null>("dots")

    const [id, setId] = useState(3)
    // const panOnDrag = [1, 2]
    const proOptions = { hideAttribution: true };


    function handleClick(id: string) {
        setActiveNode(id)
    }

    useEffect(() => {
        if (!activeNode) return
        setActiveNodeData(nodes.filter((node) => node.id === activeNode)[0])
    }, [activeNode, nodes])

    // node types
    const nodeTypes = useMemo(() => {
        // Define your node types here
        let type1 = Type1
        let type2 = Type2

        return {
            // Return the node types object
            type1,
            type2
        };
    }, []);

    // let custom = CustomEdge
    const edgeTypes = useMemo(() => {
        let custom = CustomEdge
        return {
            custom: custom
        }
    }, [])


    useEffect(() => {
        if (!activeNodeIcon) return
        addNewNode()
    }, [activeNodeIcon])

    // add node 
    const addNewNode = () => {
        const newNode: Node = {
            id: id.toString(),
            type: 'type2',
            data: {
                id: id.toString(),
                label: id.toString(),
                title: "Object",
                subtitle: "sub heading",
                icon: activeNodeIcon ? Icons.filter((icon) => icon.id === activeNodeIcon)[0].icon : <ComputerDesktopIcon />,
                onclick: handleClick
            },
            position: { x: 200 + (id * 10), y: 450 },
        }

        const tempNode = [...nodes]
        tempNode.push(newNode)
        setNodes(tempNode)

        setId(id + 1)
    }


    // updates node changes
    const handleNodeChange = (e: any) => {
        onNodesChange(e)
    }

    // updates edge
    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
        [setEdges]
    )

    // for minimap
    const nodeColor = (node: any) => {
        switch (node.type) {
            case 'type1':
                return '#055FFC';
            default:
                return '#394049';
        }
    };

    const [done, setDone] = useState(false)

    useEffect(() => {

        // if (!nodes || done === true) return
        // console.log("getting nodes...")
        // getNodes()
        // setDone(true)
        // filterNodes()
    }, [nodes])

    const getNodes = async () => {
        try {
            let res = await databases.getDocument(databaseId, collectionId, documentId)
            // let data = parse(res.data)
            console.log("data: ", res)
            // setNodes(data)

        } catch (err) {
            console.log("err: ", err)
        }
    }

    const filterNodes = () => {
        let filteredData: any = []
        nodes.map((node) => {
            filteredData.push({
                id: node.id,
                type: node.type,
                data: {
                    ...node.data,
                    icon: ""
                },
                position: node.position
            })
        }, [])

        console.log("filteredData: ", filteredData)
    }


    // update nodes
    const updateNodeData = (id: string, label: string, value: string) => {
        setNodes((node) => node.map((n) => {
            if (n.id === id) {
                return {
                    ...n,
                    data: {
                        ...n.data,
                        [label]: value
                    }
                }
            }
            return n
        }))
    }

    return (
        <>
            <Head>
                <title>Software Nodes</title>
                <meta name="theme-color" content="#1A1C1E" />
                {/* fix zoom */}
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </Head>
            <main className="bg-[#1A1C1E]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-screen h-screen overflow-hidden bg-gray-800">

                    <div className="w-screen h-screen">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={handleNodeChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}

                            // controls
                            panOnScroll
                            selectionOnDrag
                            // panOnDrag={panOnDrag}
                            selectionMode={SelectionMode.Partial}
                            minZoom={0.2}
                            maxZoom={4}
                            snapGrid={[5, 5]}
                            snapToGrid={true}
                            zoomOnDoubleClick={true}
                            className="touchdevice-flow"
                            onPaneClick={() => { setActiveNode(null) }}
                            // view
                            fitView
                            // prop options
                            proOptions={proOptions}
                        >

                            {/* <div className="hidden md:block">
                                <MiniMap className="" position="bottom-left" nodeColor={nodeColor} pannable zoomable style={{ backgroundColor: "#000", maskMode: "revert" }} />
                            </div> */}

                            {/* background  */}
                            <Background variant={variant} color={variant !== "dots" ? "#4D4E56" : ""} style={{ backgroundColor: "#1A1C1E" }} />

                            {/* header */}
                            <Header />

                            {/* bottom dock */}
                            <Panel position="bottom-center">
                                <Dock setIcon={setActiveNodeIcon} />
                            </Panel>

                            {/* node editor */}
                            <NodeEditor id={activeNode} data={activeNodeData?.data} onChange={updateNodeData} />

                            {/* appwrite logo */}
                            <Panel position="bottom-right" className="h-16 flex items-center" >
                                <Appwrite />
                            </Panel>
                        </ReactFlow>
                    </div>

                </motion.div>
            </main>
        </>
    )
}
