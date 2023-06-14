import { ChatBubbleOvalLeftIcon, Cog6ToothIcon, HandRaisedIcon, LockClosedIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, RectangleStackIcon, ScissorsIcon, ViewColumnsIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline'
import { useReactFlow } from 'reactflow'
import React, { useCallback, useContext } from 'react'
import PlaygroundContext from '../context/Filecontext'



function Toolbox() {
    const { iscollectionsSidebarOpen, setIscollectionsSidebarOpen, cutEdges, setCutEdges, setPanOnDrag, panOnDrag, lockChanges, setLockChanges }: PlaygroundProps = useContext(PlaygroundContext)

    const { setViewport, zoomIn, zoomOut, fitView } = useReactFlow();

    // focus on center
    const handleTransform = useCallback(() => {
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
    }, [setViewport]);

    return (
        <div className='flex gap-2 text-white'>
            <button onClick={() => setLockChanges(!lockChanges)} className={`p-2 rounded-md hover:bg-[#2f3439] ${lockChanges === true ? "bg-[#2f3439]" : ""}  duration-200 active:scale-90`}>
                <LockClosedIcon className='w-5 h-5' />
            </button>

            {/*  */}
            <button onClick={() => setPanOnDrag(!panOnDrag)} className={`p-2 rounded-md hover:bg-[#2f3439] ${panOnDrag === true ? "bg-[#2f3439]" : ""}  duration-200 active:scale-90`}>
                <HandRaisedIcon className='w-5 h-5' />
            </button>

            {/* zoom in */}
            <button onClick={() => zoomIn({ duration: 800 })} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <MagnifyingGlassPlusIcon className='w-5 h-5' />
            </button>

            {/* zoom out */}
            <button onClick={() => zoomOut({ duration: 800 })} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <MagnifyingGlassMinusIcon className='w-5 h-5' />
            </button>
            <button onClick={() => fitView({ duration: 800, maxZoom: 1.3 })} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <ViewfinderCircleIcon className='w-5 h-5' />
            </button>

            {/* collections/options */}
            <button onClick={() => setIscollectionsSidebarOpen(!iscollectionsSidebarOpen)} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <RectangleStackIcon className='w-5 h-5' />
            </button>

            {/* settings */}
            {/* <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <Cog6ToothIcon className='w-5 h-5' />
            </button> */}

            {/* cut edges */}
            <button onClick={() => setCutEdges(!cutEdges)} className={`p-2 rounded-md hover:bg-[#2f3439] ${cutEdges === true ? "bg-[#2f3439]" : ""}  duration-200 active:scale-90`}>
                <ScissorsIcon className='w-5 h-5 rotate-[-45deg]' />
            </button>

            
        </div>
    )
}

export default Toolbox