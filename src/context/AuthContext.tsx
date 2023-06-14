import { createContext, useEffect, useState } from "react";
import { appwriteAccount } from "../../appwrite/appwriteConfig";
import toast, { Toaster } from "react-hot-toast";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ToastSuccess } from "@/components/Toasts/Toast";


const AuthContext = createContext<AuthcontextProps>({
    loginUserWithGithub: () => { },
    user: null,
    isAuthenticated: false,
})

export default AuthContext

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {


    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    // trigger for checking if user is logged in
    useEffect(() => {
        getAccount()
    }, [])

    // get logged in user
    const getAccount = () => {
        const promise = appwriteAccount.get()

        promise.then((res) => {
            console.log("logged in user: ", res)
            setUser(res)
            setIsAuthenticated(true)

            ToastSuccess("Login successful!")
            
        }).catch((err) => {
            console.log(err)
        })
    }

    // login/signup user with github
    const loginUserWithGithub = () => {
        try {
            let res = appwriteAccount.createOAuth2Session('github', 'http://localhost:3000/file/1')
            console.log(res)

        } catch (err) {
            console.log(err)
            toast.error("Error logging in")
        }
    }

    const contextData = {
        loginUserWithGithub: loginUserWithGithub,
        user: user,
        isAuthenticated: isAuthenticated,
    }

    return (
        <AuthContext.Provider value={contextData} >
            {/* globally handling toasts */}
            <Toaster
                 position="top-right"
                 reverseOrder={false}
                 gutter={8}
                 containerClassName=""
                 containerStyle={{}}
                 toastOptions={{
                   // Define default options
                   className: '',
                   duration: 5000,
                   style: {
                     background: '#292D31',
                     color: '#fff',
                     gap: "6px",
                     border: '2px solid #394049'
                   },
               
                   // Default options for specific types
                   success: {
                     duration: 3000,
                     style:{
                        border: '0px',
                        backgroundColor: '#8DCA2A',
                        color: '#fff'
                     }
                   },error: {
                    duration: 3000,
                    style: {
                        border: '0px',
                        backgroundColor: '#F00D36',
                    }
                   }
                 }}
             />
            {children}
        </AuthContext.Provider>
    )
}