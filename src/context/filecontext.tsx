import { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import toast from 'react-hot-toast'
import { ToastError, ToastSuccess } from "@/components/Toasts/Toast";
import { appwriteAccount, databases } from "../../appwrite/appwriteConfig";
import { ID } from "appwrite";
import { useRouter } from "next/router";

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

    createNewFile: () => { }
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

    let router = useRouter()
    let { id } = router.query


    useEffect(() => {
        
    }, [])

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
    }

    return (
        <PlaygroundContext.Provider value={contextData} >
            {children}
        </PlaygroundContext.Provider>
    )
}