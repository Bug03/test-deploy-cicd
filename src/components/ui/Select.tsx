"use client"

import { SelectHTMLAttributes, forwardRef } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
    variant?: 'default' | 'cosmic' | 'nebula'
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = "", label, error, options, variant = 'default', ...props }, ref) => {
        const getVariantStyles = () => {
            switch (variant) {
                case 'cosmic':
                    return "bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-cyan-400 text-cyan-100 focus:border-cyan-300 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                case 'nebula':
                    return "bg-gradient-to-r from-purple-900 to-pink-900 border-2 border-pink-400 text-pink-100 focus:border-pink-300 focus:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                default:
                    return "bg-slate-800/50 border-2 border-slate-600 text-slate-100 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-sm"
            }
        }

        const baseStyles = `
            flex h-12 w-full px-4 py-3 text-sm font-mono transition-all duration-300
            focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50
            pixel-border-glow hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]
            cursor-pointer
            ${getVariantStyles()}
        `.replace(/\s+/g, ' ').trim()

        const errorStyles = error ? "border-red-400 focus:border-red-400 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]" : ""

        const classes = `${baseStyles} ${errorStyles} ${className}`

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-bold text-cyan-300 mb-2 font-mono tracking-wider">
                        🎯 {label}
                    </label>
                )}
                <div className="relative group">
                    <select className={classes} ref={ref} {...props}>
                        {options.map((option) => (
                            <option 
                                key={option.value} 
                                value={option.value}
                                className="bg-slate-800 text-slate-100 py-2"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {/* Custom arrow */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {/* Glow effect on focus */}
                    <div className="absolute inset-0 rounded-none border-2 border-transparent group-focus-within:border-cyan-400 group-focus-within:shadow-[0_0_20px_rgba(6,182,212,0.1)] pointer-events-none transition-all duration-300" />
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-400 font-mono flex items-center">
                        ⚠️ {error}
                    </p>
                )}
            </div>
        )
    },
)

Select.displayName = "Select"

export { Select }
