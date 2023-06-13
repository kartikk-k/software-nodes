import { createContext, useEffect, useState } from "react";

const PlaygroundContext = createContext<PlaygroundProps>({
    iscollectionsSidebarOpen: false,
    setIscollectionsSidebarOpen: (value:boolean) => { },
    activeNodeIcon: 0,
    setActiveNodeIcon: (value:number) => { }
})

export default PlaygroundContext

interface PlaygroundProviderProps {
    children: React.ReactNode
}

export const PlaygroundProvider = ({ children }: PlaygroundProviderProps) => {

    const [iscollectionsSidebarOpen, setIscollectionsSidebarOpen] = useState<boolean>(false)
    const [activeNodeIcon, setActiveNodeIcon] = useState<(number)>(0)


    const contextData = {
        // collections sidebar
        iscollectionsSidebarOpen: iscollectionsSidebarOpen,
        setIscollectionsSidebarOpen: setIscollectionsSidebarOpen,

        // active node icon
        activeNodeIcon: activeNodeIcon,
        setActiveNodeIcon: setActiveNodeIcon
    }

    return (
        <PlaygroundContext.Provider value={contextData} >
            {children}
        </PlaygroundContext.Provider>
    )
}