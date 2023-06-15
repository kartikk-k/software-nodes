import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import MenuItem from './MenuItem'
import PlaygroundContext from '../../../context/PlaygroundContext'

interface MenuProps {
    isOpen: boolean
    onClose: (value:boolean) => void
}

function Menu({ isOpen, onClose }: MenuProps) {

    const {createNewFile} = useContext(PlaygroundContext)

    const [close, setClose] = useState(false)

    useEffect(() => {
        if (isOpen === true) return setClose(false)
        setTimeout(() => {
            setClose(true)
        }, 200)
    }, [isOpen])

    const handleClick = () => {
        onClose(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0, visibility: close === true ? "hidden" : "visible" }}
            className='absolute top-14 z-50'
        >
            <div className='bg-dark-1 select-none flex flex-col gap-1 text-sm text-gray-3 w-44 p-3 rounded-xl border border-gray-2'>

                <MenuItem onClick={handleClick} title='File'
                    subMenus={[
                        { title: 'New', onClick:createNewFile },
                        { title: 'Open', onClick: handleClick },
                        { title: 'Dashboard', onClick: handleClick },
                    ]}
                />
                <MenuItem onClick={handleClick} title='Import' subMenus={[
                    {title: "JSON", onClick: handleClick}
                ]} />
                <MenuItem onClick={handleClick} title='Export' subMenus={[
                    {title: "JSON", onClick: handleClick}
                ]} />

                {/* divider */}
                <span className='h-[1px] my-1 w-full bg-gray-2'></span>

                <MenuItem onClick={handleClick} title='Help' icon={false} />
                <MenuItem onClick={handleClick} title='Contact' icon={false} />

            </div>
        </motion.div>
    )
}

export default Menu