import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Node, addEdge, SelectionMode, Panel, MiniMap, ControlButton, Controls, MarkerType, Background, Edge, Connection, useNodesState, useEdgesState, BackgroundVariant, OnConnectStart, useViewport, useKeyPress, ReactFlowProvider } from "reactflow"
import 'reactflow/dist/style.css';
import { Position } from 'reactflow';
import { CircleStackIcon, CloudIcon, ComputerDesktopIcon, CpuChipIcon, CubeIcon, FolderIcon, ServerStackIcon, WindowIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import Type1 from "@/components/nodes/Type1";
import Type2 from "@/components/nodes/Type2";
import CustomEdge from "@/components/edges/CustomEdge";
import Head from "next/head";
import Appwrite from "@/components/branding/Appwrite"
import Header from "@/components/Header/Header"
import NodeEditor from "@/components/NodeEditor"
import { databases } from "../../appwrite/appwriteConfig"
import PlaygroundContext from "../../../context/PlaygroundContext"
import IconOptions, { LoadingIcon } from "@/components/Icons"
import ObjectOptions from "@/components/ObjectOptions";
import Dock from "@/components/Dock";
import { ID } from "appwrite";


export default function Playground() {

    const initialEdges = [
        { id: 'e2-3', source: '1', target: '2', animated: true, type: "custom", arrowHeadType: "arrowclosed", label: "new"},
    ]

    const initialNodes: Node[] = [
        {
            id: '1',
            type: 'type2',
            data: {
                id: '1',
                label: 'Device',
                title: "Remote Device",
                subtitle: "user connected devices",
                icon: "Device",
                animated: true,
                themeColor: true,
                background: true,
                onclick: handleClick
            },
            position: { x: 400, y: 350 },
            sourcePosition: Position.Right
        },
        {
            id: '2',
            type: 'type2',
            data: {
                id: '2',
                label: 'Device',
                title: "AWS Server",
                subtitle: "EC2 Instance",
                icon: "Server",
                themeColor: false,
                animated: false,
                background: true,
                onclick: handleClick
            },
            position: { x: 600, y: 450 },
            targetPosition: Position.Left,
        },
    ]

    const { activeNodeIcon, setActiveNodeIcon, panOnDrag, cutEdges, lockChanges, isFetchingData, getProjectData, addNodeToDatabase, updateNodesData } = useContext(PlaygroundContext)

    const [activeNode, setActiveNode] = useState<string | null>(null)
    const [activeNodeData, setActiveNodeData] = useState<Node | null>(null)

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<object>(initialEdges);

    const [variant, setVariant] = useState<BackgroundVariant>(BackgroundVariant.Dots)

    const [contentProtector, setContentProtector] = useState<boolean>(false)
    const [loading, setIsLoading] = useState<boolean>(true)

    const [isDragging, setIsDragging] = useState<boolean>(false)

    const [id, setId] = useState(3)
    const proOptions = { hideAttribution: true }


    useEffect(() => {
        // if (loading === false) return
        if (nodes.length !== 0) {
            setIsLoading(false)
        }
    }, [loading])

    useEffect(() => {
        setNodes(initialNodes)
    }, [])

    // updating nodes in local storage
    useEffect(() => {
        if (isDragging === true) return
        localStorage.setItem("nodes", nodes ? JSON.stringify(nodes) : JSON.stringify(initialNodes))
    }, [nodes, isDragging])

    useEffect(() => {

        setInterval(() => {
            let items = localStorage.getItem("nodes")
            console.log("nodes", JSON.parse(items!))
        }, 3000)

    }, [])

    // getting local nodes data -- not working
    useEffect(() => {
        let timer = setTimeout(() => {
            let localNodes = localStorage.getItem("nodes")
            console.log(localNodes ? "ther" : "not there")

            if (localNodes) {
                localNodes.length > 0 ? setNodes(JSON.parse(localNodes)) : setNodes(initialNodes)
            } else {
                setNodes(initialNodes)
            }

            setIsLoading(false)

        }, 2000)

        return (() => {
            clearTimeout(timer)
        })

    }, [])

    // handles node click
    function handleClick(id: string) {
        setActiveNode(id)
    }

    // handles edge click
    const handleEdgeClick = (event: React.MouseEvent, edge: Edge) => {

        if (cutEdges === true) {
            setEdges((edges) => edges.filter((n) => n.id !== edge.id))
        }

        const edgeId = edge.id;
        const edgeOptions = ['straight', 'smoothstep', 'step', 'default'];
        const currentEdgeType = edge.type;
        const currentIndex = edgeOptions.indexOf(currentEdgeType!);
        const nextIndex = (currentIndex + 1) % edgeOptions.length;
        const nextEdgeType = edgeOptions[nextIndex];
        setEdges((edges) =>
            edges.map((n) => {
                if (n.id === edgeId) {
                    return {
                        ...n,
                        type: nextEdgeType,
                    };
                }
                return n;
            })
        );
    };

    const handleEdgeContextMenu = (event: React.MouseEvent, edge: Edge) => {
        event.preventDefault()
        const edgeId = edge.id


        setEdges((edge) => edge.map((n) => {
            if (n.id === edgeId) {
                return {
                    ...n,
                    animated: !n.animated,
                }
            }
            return n
        }))
    }

    const handleEdgeMouseLeave = (event: React.MouseEvent, edge: Edge) => {
        console.log("mouse leave")
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

    const handleDockActiveIcon = (id: number) => {
        if (activeNodeIcon === id) {
            addNewNode()
        }
        setActiveNodeIcon(id)
    }

    // add node 
    const addNewNode = () => {
        if (lockChanges === true) return

        let { x, y } = nodes[nodes.length - 1]?.position ? nodes[nodes.length - 1].position : { x: 0, y: 0 }

        const newNode: Node = {
            id: id.toString(),
            type: 'type2',
            data: {
                id: id.toString(),
                label: id.toString(),
                title: "Object",
                subtitle: "sub heading",
                icon: activeNodeIcon ? IconOptions.filter((icon) => icon.id === activeNodeIcon)[0].label : "Device",
                onclick: handleClick
            },
            position: { x: x + 100, y: y + 100 },
        }

        const tempNode = [...nodes]
        tempNode.push(newNode)
        setNodes(tempNode)

        // addNodeToDatabase(newNode)

        setId(id + 1)
    }

    // duplicate node shortcut
    const cmdAndDPressed = useKeyPress('ControlLeft+KeyD')

    // duplicate node function trigger
    useEffect(() => {
        if (!activeNode) return
        if (!cmdAndDPressed) return
        duplicateNode()

    }, [cmdAndDPressed])

    // duplicate node function
    const duplicateNode = () => {
        if (lockChanges === true) return

        const duplicateData = nodes.filter((node) => node.id === activeNode)[0]
        const { x, y } = duplicateData.position
        console.log(duplicateData)

        const newNode: Node = {
            ...duplicateData,
            id: id.toString(),
            type: 'type2',
            data: {
                ...duplicateData.data,
                id: id.toString(),
                label: id.toString(),
            },
            position: { x: x + 200, y: y },
        }

        const tempNode = [...nodes]
        tempNode.push(newNode)
        setNodes(tempNode)
        setActiveNode(null)

        setId(id + 1)
    }

    // multi node selection
    const handleSelectionChange = (elements: any) => {
        // console.log(elements)

    }

    // updates node changes
    const handleNodeChange = (e: any) => {
        if (lockChanges === true) return
        onNodesChange(e)
    }

    useEffect(() => {
        if (isDragging === true) return
        updateNodesData(nodes)
    }, [nodes, isDragging])

    useEffect(() => {
        if (nodes.length === 0) return
        if (isDragging) return

        let jstring = JSON.stringify(nodes[0])
        console.log("string", jstring)
        let jparse = JSON.parse(jstring)
        console.log("parsed", jparse)

    }, [isDragging])

    // updates edge
    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((els) => addEdge({ ...params, type: "smoothstep", animated: false }, els)),
        [setEdges]
    )

    useEffect(() => {
        console.log("edges: ", edges)
    }, [edges])

    const onConnectStart: OnConnectStart = (event) => {
        return {
            ...event,
            type: 'straight',
        };
    };

    // for minimap
    const nodeColor = (node: any) => {
        switch (node.type) {
            case 'type1':
                return '#055FFC';
            default:
                return '#394049';
        }
    };


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

    // export nodes as json file
    const exportNodesData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(nodes)
        )}`;

        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
    }

    useEffect(() => {
        // exportNodesData()
    }, [])

    const importNodesData = () => {
        
    }

    return (
        // <PlaygroundProvider>
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
                    className="w-screen h-screen overflow-hidden bg-gray-1">

                    <div className="w-screen h-screen">
                        <ReactFlowProvider>
                            {loading === false ? (

                                <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={handleNodeChange}
                                    onEdgesChange={onEdgesChange}
                                    onConnect={onConnect}
                                    onConnectStart={onConnectStart}
                                    nodeTypes={nodeTypes}
                                    edgeTypes={edgeTypes}
                                    onEdgeClick={handleEdgeClick}
                                    // onEdgeDoubleClick={handleEdgeDoubleClick}
                                    onEdgeContextMenu={handleEdgeContextMenu}
                                    // onEdgeMouseLeave={handleEdgeMouseLeave}
                                    onEdgeMouseEnter={handleEdgeMouseLeave}
                                    multiSelectionKeyCode={"ShiftLeft"}
                                    onSelectionChange={handleSelectionChange}
                                    // onNodeClick={() => setIsDragging(false)}
                                    onNodeDragStart={() => setIsDragging(true)}
                                    onNodeDragStop={() => setIsDragging(false)}

                                    // controls
                                    panOnScroll
                                    selectionOnDrag={!panOnDrag}
                                    panOnDrag={panOnDrag}
                                    selectionMode={SelectionMode.Partial}
                                    minZoom={0.2}
                                    maxZoom={4}
                                    snapGrid={[5, 5]}
                                    snapToGrid={true}
                                    zoomOnDoubleClick={false}
                                    // className="touchdevice-flow"
                                    onPaneClick={() => { setActiveNode(null) }}

                                    // view
                                    fitView
                                    // prop options
                                    proOptions={proOptions}
                                >

                                    {/* <div className="hidden md:block">
                                <MiniMap className="" position="bottom-left" nodeColor={nodeColor} pannable zoomable style={{ backgroundColor: "#000", maskMode: "revert" }} />
                            </div> */}

                                    {/* content protector
                            {contentProtector === true && (
                                <div onClick={() => setContentProtector(false)} className="w-screen bg-black bg-opacity-30 fixed h-screen z-40"></div>
                            )} */}

                                    {/* background  */}
                                    <Background variant={variant} color={variant !== "dots" ? "#2C2F33" : ""} style={{ backgroundColor: "#1A1C1E" }} />

                                    {/* header */}
                                    <Header closeMenu={contentProtector} />

                                    {/* bottom dock */}
                                    <Panel position="bottom-center">
                                        <Dock setIcon={handleDockActiveIcon} />
                                    </Panel>

                                    <ObjectOptions />

                                    {/* node editor */}
                                    <NodeEditor id={activeNode} data={activeNodeData?.data} onChange={updateNodeData} />

                                    {/* appwrite logo */}
                                    {/* <Panel position="bottom-right" className="h-16 flex items-center" >
                                        <Appwrite />
                                    </Panel> */}
                                </ReactFlow>

                            ) : (
                                <LoadingIcon />
                            )}

                        </ReactFlowProvider>
                    </div>

                </motion.div>
            </main>
        </>
        // </PlaygroundProvider>
    )
}
