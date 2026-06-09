"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LeftPanel from './LeftPanel'
import LoginComponent from './LoginComponent'
import RegisterComponent from './RegisterComponent'
import { getToken, getUserInfo } from '@/store/authStore'
import OtpComponent from './OtpComponent'
import Loading from '../Component/Loading'
import ForgotPasswordComponent from './ForgotPasswordComponent'
import ChangePassword from './ChangePassword'
import Store from './Store'

type Props = {}

const AuthComponent = (props: Props) => {
    const { auth } = useParams();
    const [isOtp, setIsOtp] = useState<boolean>(false);
    const token = getToken();
    const router = useRouter();
    const user = getUserInfo();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true)
        if (token && user?.is_active == 0) {
            setIsOtp(true);
        }
        setLoading(false)
    }, [])

    return (
        loading ? <Loading /> :
            auth === 'store' ? <Store /> :
                <div className='font-sans text-gray-800 antialiased min-h-screen flex'>
                    <LeftPanel />
                    {isOtp ? <OtpComponent /> :
                        auth == 'login' ? <LoginComponent /> :
                            auth === 'register' ? <RegisterComponent setIsOtp={setIsOtp} /> :
                                auth === 'forgot-password' ? <ForgotPasswordComponent /> :
                                    auth === 'change-password' ? <ChangePassword /> : ''
                    }
                </div>
    )
}

export default AuthComponent