import { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { ToastError, ToastSuccess } from "@/components/Toasts/Toast";
import { appwriteAccount, databases } from "../src/appwrite/appwriteConfig";
import { ID, Query } from "appwrite";
import { useRouter } from "next/router";
import { useNodesState } from "reactflow";
import { Node } from '@reactflow/core'

const PlaygroundContext = createContext({
    iscollectionsSidebarOpen: false,
    setIscollectionsSidebarOpen: (value: boolean) => { },

    activeNodeIcon: 0,
    setActiveNodeIcon: (value: number) => { },

    cutEdges: false,
    setCutEdges: (value: boolean) => { },

    panOnDrag: true,
    setPanOnDrag: (value: boolean) => { },

    lockChanges: false,
    setLockChanges: (value: boolean) => { },

    createNewFile: () => { },
    isFetchingData: true,

    // projectNodes: () => {},
    addNodeToDatabase: (node: Node) => { },
    getProjectData: () => { },

    updateNodesData: (data: Node[]) => { },

})

export default PlaygroundContext

interface PlaygroundProviderProps {
    children: React.ReactNode
}

export const PlaygroundProvider = ({ children }: PlaygroundProviderProps) => {

    const { user, isAuthenticated }: AuthcontextProps = useContext(AuthContext)

    const [iscollectionsSidebarOpen, setIscollectionsSidebarOpen] = useState<boolean>(false)
    const [activeNodeIcon, setActiveNodeIcon] = useState<(number)>(0)

    const [cutEdges, setCutEdges] = useState<boolean>(false)
    const [panOnDrag, setPanOnDrag] = useState<boolean>(true)
    const [lockChanges, setLockChanges] = useState<boolean>(false)

    const [isFetchingData, setIsFetchingData] = useState<boolean>(true)
    const [projectNodes, setProjectNodes] = useState<Node[]>([])
    const [previousProjectNodes, setPreviousProjectNodes] = useState<Node[]>([])

    const [nodesIdKeeper, setNodesIdKeeper] = useState<{ id: string, node_id: string }[]>([])


    let router = useRouter()
    let { id } = router.query // get file id from url

    // appwrite config
    const collectonId = process.env.NEXT_PUBLIC_APPWRITE_NODES_COLLECTION_ID
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID


    // create new file
    const createNewFile = () => {
        console.log("creating new file")
        if (!isAuthenticated) return ToastError("You must be logged in to create a new file")

        const promise = databases.createDocument("6483cd1f01c3f40565a4", "6488c832d141e54d6644", ID.unique(), {
            file_name: "Untitled",
            user_id: user?.$id
        })

        promise.then((res) => {
            console.log(res)
            ToastSuccess("New file created")
            router.push(`/file/${res.$id}/`)

        }).catch((err) => {
            console.log(err)
            ToastError("Error creating new file")
        })

    }


    useEffect(() => {
        // if (!isAuthenticated) return ToastError("You must be logged in to create a new file")
        projectData()
    }, [isAuthenticated])


    // get project data
    const projectData = () => {
        // get nodes
        const promise = databases.listDocuments(
            databaseId!,
            collectonId!,
            [
                Query.equal(
                    'file_id',
                    `${id}`
                )
            ]
        )

        promise.then((res) => {
            console.log(res)
            res.documents.map((item) => {
                let temoNodesIdKeeper = [...nodesIdKeeper] // --- pending
                // temoNodesIdKeeper.push({ id:item.$id.toString(), node_id:  })
                // setNodesIdKeeper(temoNodesIdKeeper)
            })

            processNodeDocument(res.documents)
            // setIsFetchingData(false)

        }).catch((err) => {
            ToastError("Error fetching project data")
            // setIsFetchingData(false)
            processNodeDocument([])
            console.log(err)
        })
    }

    // process node document data
    const processNodeDocument = (data: any) => {
        let nodes: Node[] = []

      

        data.map((item: any) => {

            let node: {
                id: string,
                position: { x: number, y: number },
                type: string,
                data: {
                    icon: string,
                    label: string,
                    title: string,
                    subtitle: string,
                }
            } = JSON.parse(item.node)

            nodes.push(node)
        })

        // initial node
        if (nodes.length === 0) {
            nodes.push({
                id: '1',
                type: 'type2',
                data: {
                    label: 'Device',
                    title: "Remote Device",
                    subtitle: "user connected devices",
                    icon: "Device",
                    animated: true,
                    themeColor: true,
                    background: true,
                    // onclick: handleClick
                },
                position: { x: 400, y: 350 },
            })

            setProjectNodes(nodes)
            setPreviousProjectNodes(nodes)
        } else {
            setProjectNodes(nodes)
            setPreviousProjectNodes(nodes)
        }

    }

    // update loader state
    useEffect(() => {
        if (projectNodes && projectNodes.length < 1) return
        setIsFetchingData(false)

    }, [projectNodes])


    const addNodeToDatabase = (node: Node) => {
        if (!isAuthenticated) return ToastError("You must be logged in to create a new file")

        const promise = databases.createDocument(databaseId!, collectonId!, ID.unique(), {
            file_id: id,
            node: JSON.stringify(node),
        })

        promise.then((res) => {
            console.log(res)
            ToastSuccess("New node created")

            let temoNodesIdKeeper = [...nodesIdKeeper]
            temoNodesIdKeeper.push({ id: res.$id.toString(), node_id: node.id })
            setNodesIdKeeper(temoNodesIdKeeper)

            let tempNodes = [...previousProjectNodes]
            tempNodes.push(node as Node)

            setProjectNodes(tempNodes)
            setPreviousProjectNodes(tempNodes)

        }).catch((err) => {
            console.log(err)
            ToastError("Error creating new node")
        })
    }

    // returns projectNodes
    const getProjectData = () => {
        return projectNodes.length > 0 ? projectNodes : "project nodes are empty"
    }

    const updateNodesData = (data: Node[]) => {
        let staggedNodes: Node[] = []
        // let pendingNodes: Node[] = []

        data.forEach((item: Node) => {
            let previousNode = previousProjectNodes.find((prevItem: Node) => prevItem.id === item.id)
            // console.log("previousNode: ", previousNode)
            // console.log("item node: ", item)
            if (previousNode?.id) {
                if (item.data !== previousNode?.data || item.position !== previousNode?.position) {
                    console.log("item: ", item)
                    console.log("previousNode: ", previousNode)
                    staggedNodes.push(item)
                }
            } else {
                // pendingNodes.push(item)
            }
        })

        if (staggedNodes.length < 1) {
            return console.log("no changes")
        }


        console.log("stagged nodes: ", staggedNodes)

        staggedNodes.forEach((item: Node) => {
            updateNodeInDatabase(item, data)
        })

        
    }

    const updateNodeInDatabase = (item:Node, data:Node[]) => {
        let nodeId = findId(item.id)

        if(!nodeId) return

        const promise = databases.updateDocument(databaseId!, collectonId!, nodeId, {
            node: JSON.stringify(item),
        }).then((res) => {
            setPreviousProjectNodes(data)
            ToastSuccess("Node updated")
            console.log("node updated", res)
        }).catch((err) => {
            ToastError("Error updating node")
            console.log("error updating node", err)
        })
    }

    const findId = (id:string) => {
        let node = nodesIdKeeper.find((item) => item.node_id === id)
        return node?.id
    }



    const contextData = {
        // collections sidebar
        iscollectionsSidebarOpen,
        setIscollectionsSidebarOpen,

        // active node icon
        activeNodeIcon,
        setActiveNodeIcon,

        // cut edges
        cutEdges,
        setCutEdges,

        // pan options
        panOnDrag,
        setPanOnDrag,

        // lock changes
        lockChanges,
        setLockChanges,

        createNewFile,
        isFetchingData,

        // project data
        projectNodes,
        setProjectNodes,

        addNodeToDatabase,
        getProjectData,

        updateNodesData

    }

    return (
        <PlaygroundContext.Provider value={contextData} >
            {children}
        </PlaygroundContext.Provider>
    )
}