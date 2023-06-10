import { ChatBubbleOvalLeftIcon, Cog6ToothIcon, LockClosedIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, ViewColumnsIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline'
import { useReactFlow } from 'reactflow'
import React, { useCallback } from 'react'

function Toolbox() {
    const { setViewport, zoomIn, zoomOut, fitView } = useReactFlow();

    // focus on center
    const handleTransform = useCallback(() => {
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
    }, [setViewport]);

    return (
        <div className='px-2 flex gap-2 border-[#394049] border py-2 bg-[#131517] rounded-lg text-white'>
            <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <LockClosedIcon className='w-5 h-5' />
            </button>
            <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <ChatBubbleOvalLeftIcon className='w-5 h-5' />
            </button>
            {/* <button onClick={() => zoomIn({duration: 800})} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <MagnifyingGlassPlusIcon className='w-5 h-5' />
            </button>
            <button onClick={() => zoomOut({duration: 800})} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <MagnifyingGlassMinusIcon className='w-5 h-5' />
            </button>
            <button onClick={() => fitView({duration: 800, maxZoom:1.5})} className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <ViewfinderCircleIcon className='w-5 h-5' />
            </button> */}
            <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <ViewColumnsIcon className='w-5 h-5' />
            </button>
            <button className='p-2 rounded-md hover:bg-[#2f3439] duration-200 active:scale-90'>
                <Cog6ToothIcon className='w-5 h-5' />
            </button>
        </div>
    )
}

export default Toolbox