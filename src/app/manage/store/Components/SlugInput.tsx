"use client";

import React, { useEffect, useState } from "react";

type Props = {
    form: string,
    onChange: (e: string) => void;
}
export default function SlugInput({ form, onChange }: Props) {


    const [loading, setLoading] = useState(false);
    const [slugStatus, setSlugStatus] = useState<null | "used" | "available">(null);

    const handleChange = (value: string) => {
        // ubah jadi slug format
        const slug = value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // hapus karakter aneh
            .replace(/\s+/g, "-") // spasi jadi -
            .replace(/-+/g, "-"); // double - jadi satu

        onChange(slug);
    };

    useEffect(() => {
        if (!form) {
            setSlugStatus(null);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);

            console.log("Checking slug:", form);

            // try {
            //     // contoh API cek slug
            //     const res = await fetch(`/api/check-slug?slug=${form}`);
            //     const data = await res.json();

            //     if (data.exists) {
            //         setSlugStatus("used");
            //     } else {
            //         setSlugStatus("available");
            //     }
            // } catch (error) {
            //     console.error(error);
            // }

            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [form]);

    return (
        <div className="space-y-2">
            <label className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest px-1">
                Slug URL
            </label>

            <div className="flex group">
                <div className="flex items-center px-4 rounded-l-2xl border border-r-0 border-slate-200 bg-slate-100 text-slate-400 font-bold text-sm">
                    /
                </div>

                <input
                    type="text"
                    name="slug"
                    value={form}
                    onChange={(e) => handleChange(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-r-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-sm md:text-base w-full"
                    placeholder="contoh-slug-url"
                />
            </div>

            {/* status */}
            <div className="min-h-[20px] px-1">
                {loading && (
                    <div className="flex items-center gap-2 text-xs text-indigo-500 font-medium animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                        Mengecek slug...
                    </div>
                )}

                {!loading && slugStatus === "used" && (
                    <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        Slug telah digunakan
                    </div>
                )}

                {!loading && slugStatus === "available" && (
                    <div className="flex items-center gap-2 text-xs text-green-500 font-medium">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Slug bisa digunakan
                    </div>
                )}
            </div>
        </div>
    );
}