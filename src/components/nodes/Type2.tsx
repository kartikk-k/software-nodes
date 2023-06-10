import React, { memo } from 'react'
import { Handle, Position } from 'reactflow';

interface NodeData {
    id: string,
    data: {
        label: string
        title?: string,
        subtitle?: string,
        icon?: React.ReactNode
        onclick: (id: string, data: object) => void
    },
}


const Type2 = memo(({ data, id }: NodeData) => {
    const handleClick = () => {
            // alert(id)
            data.onclick(id, {title: data.title, subtitle: data.subtitle, label: data.label})
            // onclick(id)
    }
    return (
        <div onClick={() => handleClick()}>

            <div className="flex gap-2 text-white items-center">
                {/* left side */}
                <div className="bg-[#394049] shadow-lg shadow-neutral-800 text-white rounded-md p-2 text-sm">
                    {/* icon */}
                    <div className='h-5 w-5 stroke-white'>
                        {data.icon}
                    </div>
                    {/* <ComputerDesktopIcon className="h-5 w-5 stroke-white" /> */}
                </div>

                {/* right side */}
                {(data.title || data.subtitle) && (
                    <div>
                        <p className="text-sm">{data.title}</p>
                        <p className="text-xs text-gray-400">{data.subtitle}</p>
                    </div>
                )}
            </div>

            {/* handles */}
            <Handle type="source" position={Position.Bottom} style={{ left: 17, bottom: -3, background: "white" }} />
            <Handle type="target" position={Position.Top} style={{ left: 17, bottom: -3, background: "white" }} />
            <Handle type="source" position={Position.Right} style={{left: 33,  background: "white" }} />
            <Handle type="target" position={Position.Left} style={{left: -3,  background: "white" }} />
        </div>
    );
});

export default Type2