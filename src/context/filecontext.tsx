import { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { ToastError, ToastSuccess } from "@/components/Toasts/Toast";
import { appwriteAccount, databases } from "../appwrite/appwriteConfig";
import { ID, Query } from "appwrite";
import { useRouter } from "next/router";
import {  useNodesState } from "reactflow";
import {Node} from '@reactflow/core'

const PlaygroundContext = createContext<PlaygroundProps>({
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

    // projectNodes: [],
    addNodeToDatabase: (node: object) => { },
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
    const [projectNodes, setProjectNodes] = useState<Node[] | undefined>([])


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
        if (!isAuthenticated) return
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
            // nodes.push({

            // })
            // nodes.push(item.node)
            // console.log("item", node)
        })

        // for (const [key, value] of Object.entries(data)) {
        //     console.log(`${key}: ${value}`);
        //     let node = JSON.parse(value.node)
        //     console.log(JSON.parse(value))

        // node = {
        //     id: value.$id,
        //     data: {
        //         label: value.name,
        //         type: value.type,
        //         icon: value.icon,
        //         data: value.data,
        //         position: value.position,
        //         sourcePosition: value.sourcePosition,
        //         targetPosition: value.targetPosition,
        //     },
        //     position: value.position,
        //     type: value.type,
        //     sourcePosition: value.sourcePosition,
        //     targetPosition: value.targetPosition,
        // }

        // nodes.push(node)
        // }

        // initial node
        if (nodes.length === 0) {
            // nodes.push({
            //     id: '1',
            //     type: 'type2',
            //     data: {
            //         label: 'Device',
            //         title: "Remote Device",
            //         subtitle: "user connected devices",
            //         icon: "Device",
            //         animated: true,
            //         themeColor: true,
            //         background: true,
            //         // onclick: handleClick
            //     },
            //     position: { x: 400, y: 350 },
            // })

            setProjectNodes(nodes)
        } else {
            setProjectNodes(nodes)
        }

    }

    // update loader state
    useEffect(() => {
        if (projectNodes && projectNodes.length < 1) return
        setIsFetchingData(false)

    }, [projectNodes])


    const addNodeToDatabase = (node: object) => {
        if (!isAuthenticated) return ToastError("You must be logged in to create a new file")

        const promise = databases.createDocument(databaseId!, collectonId!, ID.unique(), {
            file_id: id,
            node: JSON.stringify(node),
        })

        promise.then((res) => {
            console.log(res)
            ToastSuccess("New node created")

        }).catch((err) => {
            console.log(err)
            ToastError("Error creating new node")
        })
    }

    const contextData = {
        // collections sidebar
        iscollectionsSidebarOpen: iscollectionsSidebarOpen,
        setIscollectionsSidebarOpen: setIscollectionsSidebarOpen,

        // active node icon
        activeNodeIcon: activeNodeIcon,
        setActiveNodeIcon: setActiveNodeIcon,

        // cut edges
        cutEdges: cutEdges,
        setCutEdges: setCutEdges,

        // pan options
        panOnDrag: panOnDrag,
        setPanOnDrag: setPanOnDrag,

        // lock changes
        lockChanges: lockChanges,
        setLockChanges: setLockChanges,

        createNewFile: createNewFile,
        isFetchingData: isFetchingData,

        // project data
        projectNodes: projectNodes,
        setProjectNodes: setProjectNodes,

        addNodeToDatabase: addNodeToDatabase,


    }

    return (
        <PlaygroundContext.Provider value={contextData} >
            {children}
        </PlaygroundContext.Provider>
    )
}