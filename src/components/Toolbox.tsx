import { ChatBubbleOvalLeftIcon, Cog6ToothIcon, HandRaisedIcon, LockClosedIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, ViewColumnsIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline'
import { useReactFlow } from 'reactflow'
import React, { useCallback, useContext } from 'react'
import PlaygroundContext from '@/context/filecontext'



function Toolbox() {
    const { iscollectionsSidebarOpen, setIscollectionsSidebarOpen }:any = useContext(PlaygroundContext)

    const { setViewport, zoomIn, zoomOut, fitView } = useReactFlow();

    // focus on center
    const handleTransform = useCallback(() => {
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
    }, [setViewport]);

    return (
        <div className='flex gap-2 text-white'>
            <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <LockClosedIcon className='w-5 h-5' />
            </button>
            <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <HandRaisedIcon className='w-5 h-5' />
            </button>
            <button onClick={() => zoomIn({ duration: 800 })} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <MagnifyingGlassPlusIcon className='w-5 h-5' />
            </button>
            <button onClick={() => zoomOut({ duration: 800 })} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <MagnifyingGlassMinusIcon className='w-5 h-5' />
            </button>
            <button onClick={() => fitView({ duration: 800, maxZoom: 1.3 })} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <ViewfinderCircleIcon className='w-5 h-5' />
            </button>
            <button onClick={() => setIscollectionsSidebarOpen(!iscollectionsSidebarOpen)} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <ViewColumnsIcon className='w-5 h-5' />
            </button>
            <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <Cog6ToothIcon className='w-5 h-5' />
            </button>
            {/* <span className='h-[28px] w-[1px] bg-[#394049] my-auto'></span> */}
        </div>
    )
}

export default Toolbox