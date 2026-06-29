'use client'
import { Post } from '@/utils/Post';
import { useCorrectPath } from '@/utils/useCorrectPath';
import { ArrowRight, Loader2, MessageSquareCode, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    onClose: () => void;
    themeStyles: any;
    activeScheme: any;
    showToast: (v: string, type: string) => void;
    showOtpModal: any;
    autoResendOtp: boolean;
}

const ModalOtp = ({ onClose, themeStyles, activeScheme, showToast, showOtpModal, autoResendOtp }: Props) => {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [canResendOtp, setCanResendOtp] = useState<boolean>(false);
    const [otpTimer, setOtpTimer] = useState(60);
    const [isOtpVerifying, setIsOtpVerifying] = useState<boolean>(false);
    const otpRefs = useRef<any>([]);
    const { getCorrectPath } = useCorrectPath()
    // Fungsi handle resend dimodifikasi menerima parameter 'isAuto'
    const handleResendOtp = async (isAuto = false) => {
        // Jika bukan dari auto trigger dan tombol belum bisa diklik, maka batalkan
        if (!canResendOtp) return;
        try {
            const formData = {
                whatsapp: showOtpModal?.whatsapp
            }
            const res = await Post('auth/resend-otp', formData);
            setOtpTimer(60);
            setCanResendOtp(false);
            setOtpValues(['', '', '', '', '', '']);
            showToast('Kode OTP baru telah dikirimkan kembali ke WhatsApp Anda!', 'success');
        } catch (e: any) {
            showToast(e?.message, 'error')
        } finally {

        }


        // TODO: Taruh logika pemanggilan API Resend OTP di sini
    };

    useEffect(() => {
        if (autoResendOtp) {
            setCanResendOtp(true)
            handleResendOtp(); // Bypass pengecekan 'canResendOtp' dengan parameter true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Hentikan timer jika sudah mencapai angka 0 dan aktifkan tombol kirim ulang
        if (otpTimer <= 0) {
            setCanResendOtp(true);
            return;
        }

        const interval = setInterval(() => {
            setOtpTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [otpTimer]);

    const handleOtpChange = (val: string, index: number) => {
        const cleanVal = val.replace(/[^0-9]/g, '');
        if (!cleanVal) return;

        const newOtp = [...otpValues];
        newOtp[index] = cleanVal.slice(-1); // Ambil angka terakhir
        setOtpValues(newOtp);

        // Auto-focus input berikutnya
        if (index < 5 && cleanVal) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e: any, index: number) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otpValues];
            // Jika kosong, hapus kotak sebelumnya dan fokus ke sana
            if (!newOtp[index] && index > 0) {
                newOtp[index - 1] = '';
                setOtpValues(newOtp);
                otpRefs.current[index - 1]?.focus();
            } else {
                newOtp[index] = '';
                setOtpValues(newOtp);
            }
        }
    };

    const maskPhoneNumber = (num: any) => {
        if (!num) return '08xxxxxxxxxx';
        if (num.length < 5) return num;
        return `${num.slice(0, 4)}••••${num.slice(-3)}`;
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault(); // Mencegah reload halaman
        try {
            const formData = {
                whatsapp: showOtpModal?.whatsapp,
                otp: otpValues.join('')
            }
            const res = await Post('auth/verify-otp', formData);
            window.location.href = getCorrectPath('/')
        } catch (e: any) {
            showToast(e?.message, 'error')
        } finally {

        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
            <div className={`max-w-md w-full p-6 md:p-8 rounded-3xl border ${themeStyles.modalBg} shadow-2xl relative transition-all duration-300`}>

                {/* Close Modal Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-400 hover:text-slate-200 transition-colors"
                >
                    <X size={16} />
                </button>

                {/* Modal Head Info */}
                <div className="text-center mb-6">
                    <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr ${activeScheme.primary} flex items-center justify-center text-white mb-4 shadow-lg`}>
                        <MessageSquareCode size={24} />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-1">Verifikasi OTP WhatsApp</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Kami telah mengirimkan 6 digit kode OTP ke nomor WhatsApp terdaftar Anda <span className="font-bold text-slate-300">{maskPhoneNumber(showOtpModal?.whatsapp)}</span>.
                    </p>
                </div>

                {/* OTP 6-Digit Form Fields */}
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="flex justify-between gap-2.5">
                        {otpValues.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el: any) => (otpRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                className="w-12 h-14 md:w-14 md:h-16 text-center text-xl font-bold bg-slate-500/5 hover:bg-slate-500/10 focus:bg-slate-500/15 border border-slate-500/15 focus:border-emerald-500/80 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all"
                                required
                            />
                        ))}
                    </div>

                    {/* Countdown or Resend Block */}
                    <div className="text-center text-xs">
                        {canResendOtp ? (
                            <p className="text-slate-400">
                                Tidak menerima kode?{' '}
                                <button
                                    type="button"
                                    onClick={() => handleResendOtp()}
                                    className={`font-bold hover:underline ${activeScheme.text}`}
                                >
                                    Kirim Ulang OTP
                                </button>
                            </p>
                        ) : (
                            <p className="text-slate-400">
                                Kirim ulang kode OTP dalam <span className={`font-mono font-bold ${activeScheme.text}`}>{otpTimer} detik</span>
                            </p>
                        )}
                    </div>
                    {/* Modal Submit Button */}
                    <button
                        type="submit"
                        disabled={isOtpVerifying}
                        className={`w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r ${activeScheme.primary} shadow-lg active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2`}
                    >
                        {isOtpVerifying ? (
                            <>
                                <Loader2 className="animate-spin w-4 h-4" />
                                <span>Memverifikasi Kode...</span>
                            </>
                        ) : (
                            <>
                                <span>Verifikasi & Aktifkan Partner</span>
                                <ArrowRight size={14} />
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ModalOtp