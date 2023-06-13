// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { Background, BackgroundVariant, Connection, Edge, Panel, Position, ReactFlow, SelectionMode, addEdge, useEdgesState, useNodesState } from 'reactflow'
// import Appwrite from '../branding/Appwrite'
// import NodeEditor from '../NodeEditor'
// import Dock from '../Dock'
// import Header from '../Header/Header'
// // import { InitialEdges, InitialNodes } from './InitialData'
// import { CircleStackIcon, CloudIcon, ComputerDesktopIcon, CpuChipIcon, CubeIcon, FolderIcon, ServerStackIcon, WindowIcon } from '@heroicons/react/24/outline'
// import Type1 from '../nodes/Type1'
// import Type2 from '../nodes/Type2'
// import CustomEdge from '../edges/CustomEdge'



// const Icons = [
//     { id: 1, label: "Device", icon: <ComputerDesktopIcon /> },
//     { id: 2, label: "Server", icon: <ServerStackIcon /> },
//     { id: 3, label: "Database", icon: <CircleStackIcon /> },
//     { id: 4, label: "CPU/Chip", icon: <CpuChipIcon /> },
//     { id: 5, label: "Container", icon: <CubeIcon /> },
//     { id: 6, label: "Folders", icon: <FolderIcon /> },
//     { id: 7, label: "Cloud", icon: <CloudIcon /> },
//     { id: 8, label: "Window/Browser", icon: <WindowIcon /> }
// ]



// function Playground() {

//     const InitialNodes = [
//         {
//             id: '1',
//             type: 'type1',
//             data: {
//                 label: 'Device',
//                 title: "Remote Device",
//                 subtitle: "user connected devices",
//                 icon: "Device",
//                 animated: true,
//                 themeColor: true,
//                 onclick: handleClick
//             },
//             position: { x: 400, y: 350 },
//         },
//         {
//             id: '2',
//             type: 'type2',
//             data: {
//                 label: 'Device',
//                 title: "AWS Server",
//                 subtitle: "EC2 Instance",
//                 icon: "Server",
//                 themeColor: false,
//                 animated: false,
//                 onclick: handleClick
//             },
//             position: { x: 600, y: 450 },
//             targetPosition: Position.Left,
//         },
//     ]
    
//     const InitialEdges = [
//         { id: 'e2-3', source: '1', target: '2', animated: true, type: "smoothstep" },
//     ]

//     const [activeNode, setActiveNode] = useState<string | null>(null)
//     const [activeNodeData, setActiveNodeData] = useState<Node | null>(null)
//     const [activeNodeIcon, setActiveNodeIcon] = useState<(number)>()
//     const [nodes, setNodes, onNodesChange] = useNodesState<Node>(InitialNodes);
//     const [edges, setEdges, onEdgesChange] = useEdgesState<object>(InitialEdges);
//     const [variant, setVariant] = useState<BackgroundVariant | null>("dots")

//     const [contentProtector, setContentProtector] = useState<boolean>(false)

//     const [id, setId] = useState(3)
//     // const panOnDrag = [1, 2]
//     const proOptions = { hideAttribution: true };

//     function handleClick(id: string) {
//         setActiveNode(id)
//     }
//     useEffect(() => {
//         if (!activeNode) return
//         setActiveNodeData(nodes.filter((node) => node.id === activeNode)[0])
//     }, [activeNode, nodes])

//     // node types
//     const nodeTypes = useMemo(() => {
//         // Define your node types here
//         let type1 = Type1
//         let type2 = Type2

//         return {
//             // Return the node types object
//             type1,
//             type2
//         };
//     }, []);

//     // let custom = CustomEdge
//     const edgeTypes = useMemo(() => {
//         let custom = CustomEdge
//         return {
//             custom: custom
//         }
//     }, [])


//     useEffect(() => {
//         if (!activeNodeIcon) return
//         addNewNode()
//     }, [activeNodeIcon])

//     const handleDockActiveIcon = (id: number) => {
//         if (activeNodeIcon === id) {
//             addNewNode()
//         }
//         setActiveNodeIcon(id)
//     }

//     // add node 
//     const addNewNode = () => {
//         const newNode: Node = {
//             id: id.toString(),
//             type: 'type2',
//             data: {
//                 id: id.toString(),
//                 label: id.toString(),
//                 title: "Object",
//                 subtitle: "sub heading",
//                 icon: activeNodeIcon ? Icons.filter((icon) => icon.id === activeNodeIcon)[0].label : "Device",
//                 onclick: handleClick
//             },
//             position: { x: 200 + (id * 10), y: 450 },
//         }

//         const tempNode = [...nodes]
//         tempNode.push(newNode)
//         setNodes(tempNode)

//         setId(id + 1)
//     }


//     // updates node changes
//     const handleNodeChange = (e: any) => {
//         onNodesChange(e)
//     }

//     // updates edge
//     const onConnect = useCallback(
//         (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
//         [setEdges]
//     )

//     // for minimap
//     const nodeColor = (node: any) => {
//         switch (node.type) {
//             case 'type1':
//                 return '#055FFC';
//             default:
//                 return '#394049';
//         }
//     };

//     const [filteredNodes, setFilteredNodes] = useState<Node[]>([])

//     useEffect(() => {
//         filterNodes()
//     }, [nodes])

//     // const getNodes = async () => {
//     //     try {
//     //         let res = await databases.getDocument(databaseId, collectionId, documentId)
//     //         // let data = parse(res.data)
//     //         console.log("data: ", res)
//     //         // setNodes(data)

//     //     } catch (err) {
//     //         console.log("err: ", err)
//     //     }
//     // }

//     const saveNodes = async () => {
//         console.log(JSON.stringify(filteredNodes))
//         // return

//         // try {
//         //     let res = await databases.updateDocument(databaseId, collectionId, documentId, stringify(filteredNodes))
//         //     console.log("res: ", res)
//         // } catch (err) {
//         //     console.log("err: ", err)
//         // }
//     }

//     const filterNodes = () => {
//         let filteredData: any = []
//         nodes.map((node) => {
//             if ('onclick' in node.data) {
//                 console.log("in")
//                 const { onclick, ...rest } = node.data

//                 filteredData.push({
//                     id: node.id,
//                     type: node.type,
//                     data: rest,
//                     position: node.position
//                 })
//             }
//         }, [])

//         setFilteredNodes(filteredData)

//         console.log("filteredData: ", filteredData)
//     }



//     // update nodes
//     const updateNodeData = (id: string, label: string, value: string) => {
//         setNodes((node) => node.map((n) => {
//             if (n.id === id) {
//                 return {
//                     ...n,
//                     data: {
//                         ...n.data,
//                         [label]: value
//                     }
//                 }
//             }
//             return n
//         }))
//     }

//     return (
//             <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={handleNodeChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 nodeTypes={nodeTypes}
//                 edgeTypes={edgeTypes}
//                 onNodeDragStop={() => saveNodes()}

//                 // controls
//                 panOnScroll
//                 selectionOnDrag
//                 // panOnDrag={panOnDrag}
//                 selectionMode={SelectionMode.Partial}
//                 minZoom={0.2}
//                 maxZoom={4}
//                 snapGrid={[5, 5]}
//                 snapToGrid={true}
//                 zoomOnDoubleClick={true}
//                 className="touchdevice-flow"
//                 onPaneClick={() => { setActiveNode(null) }}
//                 // view
//                 fitView
//                 // prop options
//                 proOptions={proOptions}
//             >

//                 {/* background  */}
//                 <Background variant={variant} color={variant !== "dots" ? "#4D4E56" : ""} style={{ backgroundColor: "#1A1C1E" }} />

//                 {/* header */}
//                 <Header closeMenu={contentProtector} />

//                 {/* bottom dock */}
//                 <Panel position="bottom-center">
//                     <Dock setIcon={handleDockActiveIcon} />
//                 </Panel>

//                 {/* node editor */}
//                 <NodeEditor id={activeNode} data={activeNodeData?.data} onChange={updateNodeData} />

//                 {/* appwrite logo */}
//                 <Panel position="bottom-right" className="h-16 flex items-center" >
//                     <Appwrite />
//                 </Panel>
//             </ReactFlow>
//     )
// }

// export default Playground