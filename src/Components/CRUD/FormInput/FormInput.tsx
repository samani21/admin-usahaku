import { SelectOption } from "@/types/Public";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AlertTriangle, Eye, EyeOff, Underline } from "lucide-react";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import Link from "@tiptap/extension-link";
import TextAlign from '@tiptap/extension-text-align';
import TiptapImage from '@tiptap/extension-image';
import TiptapUnderline from '@tiptap/extension-underline';
type Props = {
    label: string;
    type:
    | "text"
    | "number"
    | "file"
    | "textarea"
    | "select"
    | "price"
    | "autocomplete"
    | "checkbox"
    | "switch"
    | "date"
    | "color"
    | "image"
    | "time"
    | "password"
    | "wysiwyg";

    name: string;
    value?: any;
    onChange: (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    error?: string;
    min?: number;
    max?: number;
    required?: boolean;
    options?: SelectOption[];
    placeholder?: string;
};

const FormInput = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    min = 0,
    required = false,
    options = [],
    placeholder,
    max,
}: Props) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const isWysiwyg = type === "wysiwyg";
    const isFile = type === "file";
    const isTextArea = type === "textarea";
    const isSelect = type === "select";
    const isPrice = type === "price";
    const isAutocomplete = type === "autocomplete";

    const baseInput =
        "w-full px-4 py-2 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-0 focus:border-emerald-500 focus:bg-white transition-all text-slate-700 font-semibold placeholder:font-normal";
    const errorStyle = error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50 focus:ring-2"
        : "border-gray-300";
    const fileStyle =
        "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300";

    useEffect(() => {
        if (isAutocomplete) {
            const selected = options.find(
                (opt) => opt.value.toString() === value?.toString()
            );
            if (selected) {
                setSearch(selected.label);
            }
        }
    }, [value, options, isAutocomplete]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (type === "image" && value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value, type]);

    /* ============================= */
    /* FORMAT RUPIAH */
    /* ============================= */
    const formatRupiah = (val: string | number) => {
        if (!val) return "";
        const number = val.toString().replace(/\D/g, "");
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        const formatted = formatRupiah(raw);

        e.target.value = formatted;

        const sendEvent = {
            ...e,
            target: {
                ...e.target,
                name,
                value: raw,
            },
        };

        onChange(sendEvent as any);
    };

    /* ============================= */
    /* AUTOCOMPLETE FILTER */
    /* ============================= */
    const filteredOptions = useMemo(() => {
        if (!open) return [];
        if (!search) return options;

        return options.filter((opt) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options, open]);

    /* ============================= */
    /* TIPTAP EDITOR CONFIG */
    /* ============================= */
    const editor = useEditor({
        extensions: [
            StarterKit,
            TiptapUnderline,
            TiptapImage, // Gunakan nama alias di sini
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        immediatelyRender: false,
        content: value || '',
        editorProps: {
            attributes: {
                // Tambahkan 'prose-p:my-1' atau cukup gunakan CSS manual di atas untuk kontrol penuh
                class: `prose prose-sm focus:outline-none max-w-none min-h-[150px] p-3 border rounded-b-lg bg-white ${error ? "border-red-500" : "border-gray-300"
                    }`,
            },
        },
        onUpdate: ({ editor }) => {
            // Hanya kirim perubahan jika user memang sedang mengetik di editor ini
            if (editor.isFocused) {
                const html = editor.getHTML();
                onChange({
                    target: {
                        name: name,
                        value: html,
                        type: 'wysiwyg'
                    }
                } as any);
            }
        },
    });
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
        }
    }, [value, editor]);
    /* ============================= */
    /* RENDER INPUT */
    /* ============================= */
    const renderInput = () => {
        if (isWysiwyg) {
            return (
                <div className="flex flex-col">
                    {/* Toolbar Sederhana */}
                    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-b-0 border-gray-300 rounded-t-lg">
                        {/* Group: Text Style */}
                        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-1.5 rounded ${editor?.isActive('bold') ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}><b>B</b></button>
                        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-1.5 rounded ${editor?.isActive('italic') ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}><i>I</i></button>
                        <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded ${editor?.isActive('underline') ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}><u>U</u></button>
                        <button type="button" onClick={() => editor?.chain().focus().toggleStrike().run()} className={`p-1.5 rounded ${editor?.isActive('strike') ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}><s>S</s></button>

                        <div className="w-[1px] h-6 bg-gray-300 mx-1" /> {/* Divider */}

                        {/* Group: Alignment */}
                        <button type="button" onClick={() => editor?.chain().focus().setTextAlign('left').run()} className={`p-1.5 rounded ${editor?.isActive({ textAlign: 'left' }) ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}>L</button>
                        <button type="button" onClick={() => editor?.chain().focus().setTextAlign('center').run()} className={`p-1.5 rounded ${editor?.isActive({ textAlign: 'center' }) ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}>C</button>
                        <button type="button" onClick={() => editor?.chain().focus().setTextAlign('right').run()} className={`p-1.5 rounded ${editor?.isActive({ textAlign: 'right' }) ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}>R</button>

                        <div className="w-[1px] h-6 bg-gray-300 mx-1" />

                        {/* Group: Lists */}
                        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded ${editor?.isActive('bulletList') ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}>• List</button>
                        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded ${editor?.isActive('orderedList') ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}>1. List</button>

                        <div className="w-[1px] h-6 bg-gray-300 mx-1" />

                        {/* Group: Extra */}
                        <button type="button" onClick={() => {
                            const url = window.prompt('Masukkan URL Link:');
                            if (url) editor?.chain().focus().setLink({ href: url }).run();
                        }} className={`p-1.5 rounded ${editor?.isActive('link') ? 'bg-green-600 text-white' : 'hover:bg-gray-200'}`}>Link</button>

                        <button type="button" onClick={() => editor?.chain().focus().undo().run()} className="p-1.5 hover:bg-gray-200 rounded">Undo</button>
                        <button type="button" onClick={() => editor?.chain().focus().redo().run()} className="p-1.5 hover:bg-gray-200 rounded">Redo</button>
                    </div>

                    {/* Area Editor */}
                    <EditorContent editor={editor} />
                </div>
            );
        }
        if (isPrice) {
            return (
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 text-sm">
                        Rp
                    </span>
                    <input
                        type="text"
                        name={name}
                        value={formatRupiah(value ?? "")}
                        onChange={handlePriceChange}
                        placeholder={placeholder}
                        className={`${baseInput} pl-10 ${errorStyle}`}
                    />
                </div>
            );
        }

        if (isSelect) {
            return (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseInput} ${errorStyle}`}
                >
                    <option value="">-- Pilih {label} --</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        if (isAutocomplete) {
            return (
                <div ref={wrapperRef} className="relative">
                    <input
                        type="text"
                        placeholder={`Cari ${label}`}
                        value={search}
                        onFocus={() => {
                            setOpen(true);
                            setSearch(""); // reset supaya semua opsi muncul
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setOpen(true);
                        }}
                        className={`${baseInput} ${errorStyle}`}
                    />

                    {open && (
                        <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => {
                                    const isSelected =
                                        opt.value.toString() === value?.toString();

                                    return (
                                        <div
                                            key={opt.value}
                                            onClick={() => {
                                                setSearch(opt.label);
                                                setOpen(false);

                                                const fakeEvent = {
                                                    target: {
                                                        name,
                                                        value: opt.value,
                                                    },
                                                };

                                                onChange(fakeEvent as any);
                                            }}
                                            className={`p-2 cursor-pointer text-sm flex justify-between items-center
                            ${isSelected
                                                    ? "bg-green-100 text-green-700 font-medium"
                                                    : "hover:bg-green-50"
                                                }
                        `}
                                        >
                                            {opt.label}
                                            {isSelected && (
                                                <span className="text-green-600 text-xs">✔</span>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="p-2 text-sm text-gray-400">
                                    Tidak ditemukan
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }


        if (isTextArea) {
            return (
                <textarea
                    name={name}
                    value={value as string}
                    onChange={onChange}
                    rows={3}
                    className={`${baseInput} ${errorStyle}`}
                />
            );
        }
        if (type === "checkbox") {
            return (
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name={name}
                        checked={!!value}
                        onChange={(e) =>
                            onChange({
                                ...e,
                                target: {
                                    ...e.target,
                                    name,
                                    value: e.target.checked,
                                },
                            } as any)
                        }
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                </label>
            );
        }
        if (type === "switch") {
            return (
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        {label}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            onChange({
                                target: {
                                    name,
                                    value: !value,
                                },
                            } as any)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${value ? "bg-green-600" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${value ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>
            );
        }
        if (type === "image") {
            return (
                <div className="space-y-3">
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        name={name}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setPreview(URL.createObjectURL(file));

                                onChange({
                                    ...e,
                                    target: {
                                        ...e.target,
                                        name,
                                        value: file,
                                    },
                                } as any);
                            }
                        }}
                        className={`${baseInput} ${fileStyle} ${errorStyle}`}
                    />
                </div>
            );
        }
        if (type === "password") {
            return (
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name={name}
                        value={value as string}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`${baseInput} pr-10 ${errorStyle}`}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            );
        }
        if (type === "color") {
            return (
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        name={name}
                        value={value || "#000000"}
                        onChange={onChange}
                        className="w-14 h-10 p-1 border rounded-lg cursor-pointer"
                    />

                    <input
                        type="text"
                        value={value || ""}
                        onChange={onChange}
                        name={name}
                        placeholder="#000000"
                        className={`${baseInput} ${errorStyle}`}
                    />

                    <div
                        className="w-10 h-10 rounded-lg border"
                        style={{ background: value || "#000000" }}
                    />
                </div>
            );
        }

        return (
            <input
                type={isFile ? "file" : type}
                name={name}
                {...(!isFile && { value })}
                onChange={onChange}
                min={type === "number" ? min : undefined}
                max={type === "number" ? max : undefined}
                step="1"
                placeholder={placeholder}
                className={`${baseInput} ${isFile ? fileStyle : ""} ${errorStyle}`}
            />
        );
    };
    {
        isWysiwyg && (
            <style jsx global>{`
        /* 1. Paksa tinggi baris dan margin paragraf jadi minimal */
        .prose p, .tiptap p {
            margin-top: 0px !important;
            margin-bottom: 0px !important;
            line-height: 1.4 !important; /* Mengatur kerapatan teks */
        }

        /* 2. Atur List agar sangat rapat */
        .prose ul, .tiptap ul, 
        .prose ol, .tiptap ol { 
            list-style-type: disc !important; 
            padding-left: 1.2rem !important; 
            margin-top: 2px !important; 
            margin-bottom: 2px !important;
        }

        /* 3. Hilangkan jarak antar item list */
        .prose li, .tiptap li { 
            margin-top: 0px !important;
            margin-bottom: 0px !important;
            padding-left: 0px !important;
        }

        /* 4. Khusus untuk paragraf di dalam list item (sering bikin renggang) */
        .prose li > p, .tiptap li > p {
            margin: 0 !important;
            display: inline; /* Menghilangkan block behavior yang bikin jarak */
        }

        /* 5. Area editor utama */
        .tiptap.prose {
            font-size: 0.875rem !important; /* Ukuran teks 14px agar proporsional */
        }
    `}</style>
        )
    }
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold text-emerald-800 uppercase tracking-widest ml-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {renderInput()}

            {error && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                    <AlertTriangle size={14} className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;
