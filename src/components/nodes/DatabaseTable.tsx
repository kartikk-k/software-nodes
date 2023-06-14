import React, { memo } from 'react'
import { Handle, Position } from 'reactflow';
import { GetIcon } from '@components/Icons';
import { motion } from 'framer-motion';

interface NodeData {
    id: string,
    data: {
        label: string
        title?: string,
        subtitle?: string,
        icon: string,
        themeColor?: boolean
        background?: boolean
        onclick: (id: string, data: object) => void
    },
}


const DbHeader = memo(({ data, id }: NodeData) => {

    const handleClick = () => {
        data.onclick(id, { title: data.title, subtitle: data.subtitle, label: data.label })
    }

    const icon = GetIcon(data.icon)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => handleClick()}>

            <div className={`flex gap-2 text-white items-center ${data.background === true ? "p-2 rounded-lg bg-[#292D31]" : ""}`}>
                {/* left side */}
                <div className='h-4 w-4 stroke-white'>
                    {icon}
                </div>

                {/* right side */}
                {(data.title || data.subtitle) && (
                    <div className='pr-4'>
                        <p className="text-sm">{data.title}</p>
                        <p className="text-xs text-gray-400">{data.subtitle}</p>
                    </div>
                )}
            </div>

            {/* handles */}
            {/* <Handle type="source" className='react-flow__handle' position={Position.Bottom} style={{ left: data.background ? '50%' : 17, bottom: -3, background: "white", opacity: "60%"}} />
            <Handle type="target" className='react-flow__handle' position={Position.Top} style={{  left: data.background ? '50%' : 17, bottom: -3, background: "white", opacity: "60%" }} />
            <Handle type="source" className='react-flow__handle' position={Position.Right} style={{ left: data.background ? "": 33,right: data.background ? -3 : "", background: "white", opacity: "60%" }} />
            <Handle type="target" className='react-flow__handle' position={Position.Left} style={{ left: -3, background: "white", opacity: "60%" }} /> */}
        </motion.div>
    );
});

export default DbHeader