import React from 'react'

type Props = {
    children: any;
    className: string;
}

const GlassCard = ({ children, className = "" }: Props) => {
    return (
        <div className={`bg-white/70 backdrop-blur-md border border-white/50 shadow-xl shadow-emerald-900/5 rounded-[2rem] ${className}`}>
            {children}
        </div>
    )
}

export default GlassCard