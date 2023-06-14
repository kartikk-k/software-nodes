import AppLogo from '@/components/branding/AppLogo'
import GithubLogo from '@/components/branding/GithubLogo'
import AuthContext from '../../../context/AuthContext'
import React, { useContext } from 'react'

function Login() {

    const { loginUserWithGithub }:AuthcontextProps = useContext(AuthContext)

    const handleClick = () => {
        loginUserWithGithub()
    }

    return (
        <div className='w-screen flex items-center justify-center h-screen bg-dark-2'>
            <div className='flex flex-col gap-6 border-2 p-8 rounded-lg bg-gray-1 border-gray-2'>
                {/* header */}
                <div className='flex flex-col items-center text-white'>
                    <AppLogo />
                    <h1>Software Nodes</h1>
                </div>

                <div>
                    <button onClick={() => handleClick()} className='p-2 rounded-lg bg-white hover:scale-105 duration-200 flex items-center gap-2'>
                        <span className='border-r border-r-gray-2 pr-2'>
                            <GithubLogo />
                        </span>
                        <span className='font-medium text-gray-1'>Login with Github</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login