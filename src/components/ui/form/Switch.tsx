import React from 'react'
import { motion } from 'framer-motion'

interface SwitchProps {
    value: boolean,
    onChange: (value: boolean) => void
}

function Switch({ value, onChange }: SwitchProps) {

    return (
        <motion.div
            animate={{ justifyContent: value === true ? "flex-end" : "flex-start" }}
            onClick={() => onChange(!value)}
            className={`bg-dark-2 relative select-none cursor-pointer h-7 flex w-16 rounded-full items-center p-1`}
        >

            <motion.span
            animate={{opacity: value === true ? "100%" : "40%" }}
             className={`w-4 relative shrink-0 h-4 rounded-full m-1 bg-gray-3 duration-200 `}></motion.span>
            <span className={`text-xs ${value === true ? "opacity-100" : "opacity-0"} duration-200 absolute text-gray-3 left-2`}>ON</span>
            <span className={`text-xs ${value === false ? "opacity-100" : "opacity-0"} duration-200 absolute text-gray-3 right-2`}>OFF</span>
        </motion.div>
    )
}

export default Switch