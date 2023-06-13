import React, { useContext, useEffect, useState } from 'react'
import {
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";
import { CircleStackIcon, CloudIcon, ComputerDesktopIcon, CpuChipIcon, CubeIcon, FolderIcon, ServerStackIcon, WindowIcon } from '@heroicons/react/24/outline';
import PlaygroundContext from '@/context/filecontext';


interface DockProps {
    setIcon: (id: number) => void
}

function Dock({ setIcon }: DockProps) {
    const {activeNodeIcon} = useContext(PlaygroundContext)
    const [activeNode, setActiveNode] = useState<number | null>(null)
    const svgClass = "w-[50%] stroke-1"

    const count = [
        { id: 1, label: "Device", icon: <ComputerDesktopIcon className={svgClass} /> },
        { id: 2, label: "Server", icon: <ServerStackIcon className={svgClass} /> },
        { id: 3, label: "Database", icon: <CircleStackIcon className={svgClass} /> },
        { id: 4, label: "CPU/Chip", icon: <CpuChipIcon className={svgClass} /> },
        { id: 5, label: "Container", icon: <CubeIcon className={svgClass} /> },
        { id: 6, label: "Folders", icon: <FolderIcon className={svgClass} /> },
        { id: 7, label: "Cloud", icon: <CloudIcon className={svgClass} /> },
        { id: 8, label: "Window/Browser", icon: <WindowIcon className={svgClass} /> }
    ]
    let mouseX = useMotionValue(Infinity);


    useEffect(() => {
        setActiveNode(activeNodeIcon)
    }, [activeNodeIcon])

    const activateNode = (id: number) => {
        setActiveNode(id)
        setIcon(id)
    }

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="mx-auto top-10 h-16 border border-[#394049] items-end inline-flex gap-4 rounded-2xl bg-[#131517] px-4 pb-3"
        >
                {count.map((i) => (
                    <AppIcon
                        id={i.id}
                        mouseX={mouseX}
                        key={i.id}
                        icon={i.icon}
                        label={i.label}
                        setActiveNode={activateNode}
                        active={activeNode === i.id}
                    />
                ))}
        </motion.div>
    );
}


interface AppIconProps {
    id: number
    mouseX: MotionValue
    icon: React.ReactNode
    label: string
    setActiveNode: any
    active: boolean
}

function AppIcon({ mouseX, icon, label, setActiveNode, id, active }: AppIconProps) {
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (clicked === false) return
        let timer = setTimeout(() => {
            setClicked(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [clicked])

    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const handleClick = () => {
        setClicked(!clicked)
        setActiveNode(id)
    }

    return (
        <motion.div
            animate={clicked ? { y: [0, 10, 0] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => handleClick()}
            ref={ref}
            style={{ width }}
            className={`aspect-square group relative text-white flex items-center justify-center cursor-pointer w-10 rounded-xl ${active ? "bg-[#055FFC]" : "bg-black"} `}
        >
            {icon}
            {/* tool tip */}
            <span className='text-xs opacity-0 duration-150 group-hover:opacity-100 absolute top-[-30px] text-white bg-black px-2 py-1 rounded-md'>{label}</span>
        </motion.div>
    );
}


export default Dock