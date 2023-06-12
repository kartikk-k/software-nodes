import React from 'react'

function AppLogo() {
    return (
        <div className='cursor-pointer hover:scale-110 duration-200 active:scale-100'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="none"
                viewBox="0 0 36 36"
            >
                <path
                    fill="#055FFC"
                    d="M17.245 5.971a1 1 0 01.835-.45h7.073a1 1 0 01.872.51l8.432 14.957a1 1 0 01-.871 1.492h-7.309a1 1 0 01-.87-.508l-4.227-7.464a1 1 0 00-.87-.508H13.81a1 1 0 01-.835-1.55l4.269-6.479zM1.543 15.012a1 1 0 01.87-1.49h7.31a1 1 0 01.87.506l4.226 7.465a1 1 0 00.87.507h6.5a1 1 0 01.834 1.55l-4.268 6.48a1 1 0 01-.835.449h-7.074a1 1 0 01-.871-.51L1.543 15.013z"
                ></path>
            </svg>
        </div>
    )
}

export default AppLogo