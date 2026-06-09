"use client"
import { getUserInfo, useAuthStore } from '@/store/authStore';
import { AlertTriangle, KeyRound, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loading from '../Component/Loading';
import { OtpInput } from 'reactjs-otp-input';
const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const OtpComponent = () => {
    const { loading, error, clearError, resendOtp, verifyOtp, login } = useAuthStore();
    const [otp, setOtp] = useState('');
    const [counter, setCounter] = useState(20);
    const router = useRouter();
    const user = getUserInfo();
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (counter > 0) {
            timer = setTimeout(() => setCounter(counter - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [counter]);
    const handleResend = async () => {

    }

    useEffect(() => {
        if (otp?.length === 6) {
            handleVerifyOtp()
        }
    }, [otp])
    const handleVerifyOtp = async () => {
        const data = {
            whatsapp: user?.whatsapp,
            otp: otp
        }
        const success = await verifyOtp(data);
        if (success) {
            router?.push('/admin/dashboard')
        }
    }
    const formatContactMasked = (contact: string) => {
        if (isEmail(contact)) {
            const [name, domain] = contact?.split('@');
            const maskedName = name.length > 2
                ? name.slice(0, 2) + '*'.repeat(name.length - 2)
                : name[0] + '*';
            return maskedName + '@' + domain;
        } else {
            if (contact?.length < 3) return contact;
            const lastThree = contact?.slice(-3);
            return '****_****_*' + lastThree;
        }
    };

    const isEmail = (value: string) => value?.includes('@');

    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center bg-white p-6 sm:p-12">
            <div className="w-full max-w-lg">

                <div className="text-center lg:text-left mb-8 lg:hidden">
                    <a href="#" className="text-3xl font-extrabold flex items-center justify-center">
                        <span className="text-[var(--primary-color)]">Usaha</span><span className="text-[var(--secondary-color)]">Ku</span>
                    </a>
                </div>

                <h1 id="form-title" className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 text-center lg:text-left">
                    Aktivasi Akun Anda
                </h1>

                <div className="text-center ">
                    <KeyRound className="w-10 h-10 text-[var(--primary-color)] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Aktivasi Akun</h3>
                    <p className="text-gray-600 mb-2">
                        Pendaftaran Anda berhasil! Untuk mengaktifkan akun, kami telah mengirimkan kode verifikasi 6 digit ke alamat Email dan Whatsapp Anda: <span className="font-semibold text-gray-900"></span>.
                    </p>
                    <div className='grid'>
                        <b>{formatContactMasked(user?.email)}</b>
                        <b>{formatContactMasked(user?.whatsapp)}</b>
                    </div>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        isInputNum
                        shouldAutoFocus
                        inputStyle={styles.otpInput}
                        containerStyle={styles.otpContainer}
                    />
                    <div className='px-4 pt-8'>
                        {error && <p className="text-center text-red-500 text-sm mb-4 mt-[-20px]">{error}</p>}
                    </div>

                    <div className='text-center text-[#444444] mt-3' style={{ letterSpacing: "-0.04em" }}>
                        {!counter ? (
                            <p className="text-sm text-gray-500 mt-4" onClick={handleResend}>
                                Belum menerima kode? <span id="resend-otp-link" className="font-medium text-[var(--secondary-orange)] hover:text-orange-600">Kirim ulang kode verifikasi</span>
                            </p>
                        ) : (
                            <span className='font-[500] text-[14px]'>
                                Kirim ulang dalam <strong className='text-[17px] font-bold'>{formatTime(counter)}</strong>
                            </span>
                        )}
                        <br />
                    </div>
                </div>

                <div className="relative mt-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Atau masuk/daftar dengan</span>
                    </div>
                </div>
            </div>
            {
                loading && <Loading title='Memverifikasi Akun' />
            }
        </div>
    )
}

const styles = {
    otpContainer: {
        justifyContent: 'center',
        marginTop: '30px',
    },
    otpInput: {
        border: `2px solid #1B5E20`,
        width: '3rem',
        height: '3rem',
        fontSize: '1.5rem',
        margin: '0 0.25rem',
        borderRadius: '10px',
        outline: 'none'
    },
};
export default OtpComponent