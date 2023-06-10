import React from 'react'
import Toolbox from '../Toolbox'
import AppLogo from '../branding/AppLogo'

function Header() {
    return (
        <div className='fixed shadow-md p-2 justify-between border-[#394049] border-b bg-[#1A1C1E] flex gap-4 items-center top-0 left-0 z-20 w-screen'>
            {/* left section */}
            <div className='flex gap-4 items-center'>
                <AppLogo />
                <span className='h-[28px] w-[1px] bg-[#394049] my-auto'></span>
                <Toolbox />
            </div>

            {/* right section  */}
            <div>
                <button className='px-4 py-2 text-white text-xs rounded-md bg-primary'>My Account</button>
            </div>
        </div>
    )
}

export default Header