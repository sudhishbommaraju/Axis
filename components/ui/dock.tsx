"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface DockProps {
    className?: string
    items: {
        icon: React.ComponentType<{ className?: string }>
        label: string
        onClick?: () => void
    }[]
}

export default function Dock({ items, className }: DockProps) {
    const [active, setActive] = React.useState<string | null>(null)
    const [hovered, setHovered] = React.useState<number | null>(null)

    return (
        <div className={cn("flex items-center justify-center w-full py-6", className)}>
            <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                    "flex items-end gap-4 px-4 py-3 rounded-3xl",
                    "border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl shadow-black/50"
                )}
            >
                <TooltipProvider delayDuration={100}>
                    {items.map((item, i) => {
                        const isActive = active === item.label
                        const isHovered = hovered === i

                        return (
                            <Tooltip key={item.label}>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        onMouseEnter={() => setHovered(i)}
                                        onMouseLeave={() => setHovered(null)}
                                        animate={{
                                            scale: isHovered ? 1.2 : 1,
                                            y: isHovered ? -5 : 0,
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="relative flex flex-col items-center"
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn(
                                                "rounded-2xl relative w-12 h-12",
                                                "transition-all duration-300",
                                                "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white",
                                                isActive && "text-emerald-400 bg-emerald-500/10"
                                            )}
                                            onClick={() => {
                                                setActive(item.label)
                                                item.onClick?.()
                                            }}
                                        >
                                            <item.icon
                                                className={cn(
                                                    "h-6 w-6 transition-colors",
                                                )}
                                            />
                                            {/* Glowing ring effect */}
                                            {isHovered && (
                                                <motion.span
                                                    layoutId="glow"
                                                    className="absolute inset-0 rounded-2xl border border-white/20"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                        </Button>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="dot"
                                                className="w-1 h-1 rounded-full bg-emerald-500 mt-2 absolute -bottom-2"
                                            />
                                        )}
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs bg-black/80 border-white/10 text-white">
                                    {item.label}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                </TooltipProvider>
            </motion.div>
        </div>
    )
}
