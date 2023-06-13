interface PlaygroundProps {
    iscollectionsSidebarOpen: boolean,
    setIscollectionsSidebarOpen: (value:boolean) => void
    activeNodeIcon: number,
    setActiveNodeIcon: (value:number) => void
}

interface NodeIconsProps {
    id: number,
    label: string,
    icon: React.ReactNode,
    tags: string[],
}