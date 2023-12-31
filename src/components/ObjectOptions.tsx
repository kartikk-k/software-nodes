import { MagnifyingGlassIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import Label from './ui/form/Label'
import PlaygroundContext from '../../context/PlaygroundContext'

import { motion } from 'framer-motion'
import IconOptions from './Icons'


function ObjectOptions() {
    const { iscollectionsSidebarOpen, setActiveNodeIcon } = useContext(PlaygroundContext)

    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
    const [iconsList, setIconsList] = useState<NodeIconsProps[]>([])
    const [searchInput, setSearchInput] = useState<string>('')


    useEffect(() => {
        setIconsList(IconOptions)
    }, [IconOptions])

    // close sidebar when iscollectionsSidebarOpen is false
    useEffect(() => {
        if (iscollectionsSidebarOpen === true) return setIsOpenSidebar(true)
        let timer = setTimeout(() => {
            setIsOpenSidebar(false)
        }, 200);

        return () => {
            clearTimeout(timer)
        }

    }, [iscollectionsSidebarOpen])


    // search
    useEffect(() => {
        if(!searchInput.trim()) return setIconsList(IconOptions)

        const filteredIcons = IconOptions.filter(icon => {
            return icon.tags.some(tag => tag.includes(searchInput.toLocaleLowerCase()))
        })

        setIconsList(filteredIcons)

    }, [searchInput])

    return (
        <div>
            {isOpenSidebar && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: iscollectionsSidebarOpen === true ? 1 : 0 }}
                    className='scrollbar-light fixed border max-h-[85vh] overflow-auto h-auto border-gray-2 rounded-xl w-56 p-4 text-white z-30 bg-dark-1 left-4 top-20'>
                    {/* header */}
                    <div className='text-white flex justify-between items-center'>
                        <span className='text-sm'>Collections</span>
                        <RectangleStackIcon className='w-5 h-5' />
                    </div>

                    {/* search icon */}
                    <div className='flex items-center text-gray-3 bg-dark-2 px-2 py-2 my-4 rounded-lg'>
                        <MagnifyingGlassIcon className='w-5 h-5' />
                        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder='search here...' className='bg-transparent duration-200 group text-sm focus:text-white px-2 outline-none  w-full' />
                    </div>

                    {/* lists */}
                    <div className='py-4'>
                        {/* icons list */}
                        <div>
                            <Label text='Icons' />
                            {/* list of icons */}
                            <div className='flex py-2 flex-wrap gap-x-3 gap-y-1'>
                                {iconsList.length!==0 ? iconsList.map((icon) => (
                                    <div onClick={() => setActiveNodeIcon(icon.id)} key={icon.id} className='text-white flex justify-center items-center hover:scale-110 active:scale-100 duration-200 cursor-pointer hover:bg-primary shrink-0 w-9 h-9 px-2 py-2 rounded-lg'>
                                        {icon.icon}
                                    </div>
                                )) : (
                                    <p className='text-sm text-gray-3'>No result found</p>
                                )}
                            </div>
                        </div>
                    </div>

                </motion.div>
            )}
        </div>
    )
}

export default ObjectOptions