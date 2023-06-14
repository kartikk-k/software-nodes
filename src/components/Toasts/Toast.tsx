import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import toast from 'react-hot-toast'


export const ToastSuccess = (text: string) => {
    toast.success(`${text}`, {
        icon: <CheckCircleIcon className="w-5 h-5" />,
        className: "text-sm"
    })
}

export const ToastError = ( text :string) => {
    toast.error(text, {
        icon: <XCircleIcon className="w-5 h-5" />,
        className: "text-sm"
    })
}
