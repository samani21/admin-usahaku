import { X } from 'lucide-react';
import React, { useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

type Props = {
    children: React.ReactNode;
    activeModal: boolean;
    closeModal: () => void;
    isDarkMode: boolean;
};

const ModalWrapper = ({ children, activeModal, closeModal, isDarkMode }: Props) => {
    const controls = useDragControls();
    const constraintsRef = useRef(null);

    return (
        <AnimatePresence>
            {activeModal && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-8">
                    {/* Backdrop / Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        ref={constraintsRef}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        drag="y"
                        dragControls={controls} // Mengaitkan drag hanya ke handle
                        dragListener={false}    // Mematikan drag di seluruh area agar scroll jalan
                        dragConstraints={{ top: 0 }}
                        dragElastic={{ top: 0, bottom: 0.5 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 150) closeModal();
                        }}
                        className={`relative w-full max-w-5xl h-[79vh] md:h-auto md:max-h-[85vh] flex flex-col shadow-2xl rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                            }`}
                    >
                        {/* 1. Drag Handle (Hanya area ini yang bisa ditarik untuk menutup) */}
                        <div
                            onPointerDown={(e) => controls.start(e)} // Memulai drag saat handle ditekan
                            className="absolute  w-full flex flex-col items-center justify-center  cursor-grab active:cursor-grabbing flex-shrink-0 z-30"
                        >
                            <div className={`w-24 h-4 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} flex items-center justify-center`}>
                                <div className={`w-16 h-1.5 rounded-full ${isDarkMode ? 'bg-white' : 'bg-slate-700'}`} />
                            </div>
                        </div>

                        {/* 2. Desktop Close Button (Hanya muncul di desktop) */}
                        <button
                            onClick={closeModal}
                            className="hidden md:flex absolute top-5 right-5 z-50 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-transform hover:rotate-90"
                        >
                            <X size={24} />
                        </button>

                        {/* 3. Scrollable Content (Area Children) */}
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ModalWrapper;