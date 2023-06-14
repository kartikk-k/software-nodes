import { PaintBrushIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Label from './ui/form/Label'
import Input from './ui/form/Input'
import Switch from './ui/form/Switch'
import { motion } from 'framer-motion'

interface NodeEditorProps {
    id: string | null,
    data: {
        title: string,
        subtitle: string,
        themeColor: boolean,
        animated: boolean,
        edgeType?: "straight" | "default" | "step" | "smoothstep" | "straightCross" | "defaultCross" | "stepCross" | "smoothstepCross",
    }
    onChange: (id: string, title: string, subtitle: string, themeColor?: boolean, animated?: boolean) => void
}

function EdgeEditor({ id, data, onChange }: NodeEditorProps) {
 
    const handleChange = (label: string, value: any) => {
        id && onChange(id, label, value)
    }

    return (
        <div className='fixed border h-auto border-gray-2 rounded-xl w-56 p-4 text-white z-30 bg-dark-1 right-4 top-20'>
            {/* header */}
            <div className='text-white flex justify-between items-center'>
                <span className='text-sm'>Node Editor</span>
                <PaintBrushIcon className='w-5 h-5' />
            </div>

            {/* content */}

            <motion.div
                initial={{ height: 0 }}
                animate={{ height: (id && data) ? "auto" : 0 }}
                className='overflow-hidden'
            >
                {/* divider */}
                <div className='h-[2px] bg-gray-2 my-4'></div>

                {/* edit options */}
                {(id && data) && (

                    <div className='flex flex-col gap-6'>
                        {/* node title */}
                        <div className='space-y-2'>
                            <Label text='Title' />
                            <Input value={data.title} onChange={(value: string) => handleChange("title", value)} />
                        </div>

                        {/* node subtitle */}
                        <div className='space-y-2'>
                            <Label text='Subtitle' />
                            <Input value={data.subtitle} onChange={(value: string) => handleChange("subtitle", value)} />
                        </div>

                        {/* theme color */}
                        <div className='space-y-2'>
                            <Label text='Theme color' />
                            <Switch value={data.themeColor} onChange={((value: boolean) => handleChange("themeColor", value))} />
                        </div>

                        {/* animated edge */}
                        <div className='space-y-2'>
                            <Label text='Animated' />
                            <Switch value={data.animated} onChange={((value: boolean) => handleChange("animated", value))} />
                        </div>

                    </div>
                )}
            </motion.div>

        </div>
    )
}

export default EdgeEditor