import React, { memo } from 'react'
import { Handle, Position } from 'reactflow';
import { GetIcon } from '../NodeIcons';
import { motion } from 'framer-motion';

interface NodeData {
    id: string,
    data: {
        label: string
        title?: string,
        subtitle?: string,
        icon: string,
        onclick: (id: string, data: object) => void
    },
}


const Type1 = memo(({ data, id }: NodeData) => {
    const handleClick = () => {
        // alert(id)
        data.onclick(id, { title: data.title, subtitle: data.subtitle, label: data.label })
        // onclick(id)
    }

    const icon = GetIcon(data.icon)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => handleClick()}
        >

            <div className="flex gap-2 text-white items-center">
                {/* left side */}
                <div className="bg-[#055FFC] text-white rounded-md p-2 text-sm shadow-lg shadow-gray-800">
                    {/* icon */}
                    <div className='h-5 w-5 stroke-white'>
                        {icon}
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
            <Handle type="source" isConnectable={true} position={Position.Bottom} style={{ left: 17, bottom: -3, background: "white" }} />
        </motion.div>
    );
});

export default Type1