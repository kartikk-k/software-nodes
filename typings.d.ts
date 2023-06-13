interface PlaygroundProps {
    iscollectionsSidebarOpen: boolean,
    setIscollectionsSidebarOpen: (value:boolean) => void,

    activeNodeIcon: number,
    setActiveNodeIcon: (value:number) => void,

    cutEdges: boolean,
    setCutEdges: (value:boolean) => void,

    panOnDrag: boolean,
    setPanOnDrag: (value:boolean) => void,

    lockChanges: boolean,
    setLockChanges: (value:boolean) => void,
}

interface NodeIconsProps {
    id: number,
    label: string,
    icon: React.ReactNode,
    tags: string[],
}