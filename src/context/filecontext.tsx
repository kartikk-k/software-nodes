import { createContext, useEffect, useState } from "react";

const PlaygroundContext = createContext<PlaygroundProps>({
    iscollectionsSidebarOpen: false,
    setIscollectionsSidebarOpen: (value:boolean) => { },

    activeNodeIcon: 0,
    setActiveNodeIcon: (value:number) => { },

    cutEdges:false,
    setCutEdges: (value:boolean) => { },

    panOnDrag:true,
    setPanOnDrag: (value:boolean) => { },

    lockChanges:false,
    setLockChanges: (value:boolean) => { },
})

export default PlaygroundContext

interface PlaygroundProviderProps {
    children: React.ReactNode
}

export const PlaygroundProvider = ({ children }: PlaygroundProviderProps) => {

    const [iscollectionsSidebarOpen, setIscollectionsSidebarOpen] = useState<boolean>(false)
    const [activeNodeIcon, setActiveNodeIcon] = useState<(number)>(0)

    const [cutEdges, setCutEdges] = useState<boolean>(false)
    const [panOnDrag, setPanOnDrag] = useState<boolean>(false)
    const [lockChanges, setLockChanges] = useState<boolean>(false)

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
    }

    return (
        <PlaygroundContext.Provider value={contextData} >
            {children}
        </PlaygroundContext.Provider>
    )
}