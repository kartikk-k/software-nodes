'use client'
import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import dynamic from "next/dynamic";


interface MenuItemProps {
    title: string
    icon?: boolean
    onClick: () => void
    subMenus?: MenuItemProps[]
}


function MenuItem({ title, icon = true, onClick, subMenus }: MenuItemProps) {

    const buttonClass = "flex group w-full items-center duration-200 justify-between px-2 py-1 hover:bg-gray-2 hover:bg-opacity-50 rounded-md"

    return (
        <div>
            <button onClick={() => onClick()} className='flex relative group items-center duration-200 justify-between px-2 py-1 hover:bg-gray-2 hover:bg-opacity-50 rounded-md'>
                <span>{title}</span>
                {icon === true && (
                    <ChevronRightIcon className='w-5 h-5' />
                )}
                {subMenus && (
                    <div className='absolute z-10 p-2 w-44 bg-dark-1 border border-gray-2 rounded-xl left-32 my-2 top-0 group-hover:block hidden '>
                        {subMenus.map((item) => (
                            <button key={item.title} className={buttonClass} >{item.title}</button>
                        ))}
                    </div>
                )}
            </button>
        </div>
    )
}

export default dynamic (() => Promise.resolve(MenuItem), {ssr: false})
