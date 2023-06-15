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

    createNewFile: () => void,

    isFetchingData: boolean,

    // projectNodes: [] | undefined,
    addNodeToDatabase: (node:object) => void,

    getProjectData: () => void,
}

interface AuthcontextProps {
    loginUserWithGithub: () => void,
    user: User | null,
    isAuthenticated: boolean,
}

interface User  {
    $id: string,
    email: string,
    emailVerification: boolean,
    name: string,
    status: boolean
}

interface NodeIconsProps {
    id: number,
    label: string,
    icon: React.ReactNode,
    tags: string[],
}