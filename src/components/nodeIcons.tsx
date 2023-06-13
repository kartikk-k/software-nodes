import { CircleStackIcon, CloudIcon, ComputerDesktopIcon, CpuChipIcon, CubeIcon, FolderIcon, ServerStackIcon, WindowIcon } from '@heroicons/react/24/outline'
import React from 'react'

const NodeIcons:NodeIconsProps[] = [
    { id: 1, label: "Device", icon: <ComputerDesktopIcon />,tags: ["device", "computer", "desktop"] },
    { id: 2, label: "Server", icon: <ServerStackIcon />,tags: ["server", "aws", "azure"] },
    { id: 3, label: "Database", icon: <CircleStackIcon />,tags: ["database", "stack", "cluster", "storage", "aws"] },
    { id: 4, label: "CPU/Chip", icon: <CpuChipIcon />,tags: ["cpu", "gpu", "ai", "processor"] },
    { id: 5, label: "Container", icon: <CubeIcon />,tags: ["container", "docker", "cube", "kubernetes"] },
    { id: 6, label: "Folders", icon: <FolderIcon />,tags: ["folder", "storage", "file", "document"] },
    { id: 7, label: "Cloud", icon: <CloudIcon />,tags: ["cloud","storage"] },
    { id: 8, label: "Window/Browser", icon: <WindowIcon />,tags: ["window", "browser", "device", "mobile"] }
]

export const GetIcon = (label:string) => {
    const icon = NodeIcons.find((icon) => icon.label === label)
    return icon?.icon
}

export default NodeIcons