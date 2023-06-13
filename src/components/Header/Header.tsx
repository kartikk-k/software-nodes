import React, { useContext, useEffect, useRef, useState } from 'react'
import Toolbox from '../Toolbox'
import AppLogo from '../branding/AppLogo'
import { BoltIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Menu from '../menu/Menu'
import PlaygroundContext from '../../context/filecontext'

interface HeaderProps {
    closeMenu: boolean
}

function Header({ closeMenu }: HeaderProps) {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const {test}:any = useContext(PlaygroundContext)
    console.log("test:", test)

    useEffect(() => {
        if (closeMenu === true) return
        setIsMenuOpen(false)
    }, [closeMenu])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className='fixed z-40 shadow-md p-2 px-3 justify-between border-[#394049] border-b bg-dark-1 flex gap-4 items-center top-0 left-0 w-screen'>
            {/* left section */}
            <div className='flex relative w-full gap-4 items-center'>
                <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <AppLogo />
                </div>

                {/* menu */}
                <Menu isOpen={isMenuOpen} onClose={setIsMenuOpen} />

                <span className='h-[28px] w-[1px] bg-[#394049] my-auto'></span>
                <Toolbox />
            </div>

            <div className='w-full flex justify-center'>
                <input type="text" className='bg-transparent focus:text-white focus:border-white duration-200 rounded-none border-b-2 text-sm w-32 text-center text-[#A0A6B1] border-[#394049] outline-none px-4 pt-2 pb-1' placeholder='Untitled' />
            </div>

            {/* right section  */}
            <div className='w-full flex items-center justify-end gap-2'>
                <button className='flex text-[#A0A6B1] p-2 px-4 hover:text-white duration-200 active:scale-95 rounded-md hover:bg-[#394049] items-center gap-2 text-xs'>
                    <BoltIcon className='w-4 h-4' />
                    <span>Share</span>
                </button>
                <button className='px-4 py-2 text-white text-xs rounded-md bg-primary hover:bg-primary-dark duration-200'>My Account</button>
            </div>
        </div>
    )
}

export default Header