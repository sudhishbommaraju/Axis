"use client";

import { cn } from "@/lib/utils";
import {
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    Video,
    Globe,
    ArrowRight
} from "lucide-react";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto w-full">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-xl overflow-hidden transition-all duration-300",
                        "border border-white/10 bg-white/5 backdrop-blur-md", // Custom Glassmorphism for Axis
                        "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
                        "hover:-translate-y-0.5 will-change-transform",
                        item.colSpan || "col-span-1",
                        item.colSpan === 2 ? "md:col-span-2" : "",
                        {
                            "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5":
                                item.hasPersistentHover,
                            "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={cn(
                            "absolute inset-0 transition-opacity duration-300",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div className="relative flex flex-col space-y-4 h-full justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all duration-300 text-white">
                                    {item.icon}
                                </div>
                                {item.status && (
                                    <span
                                        className={cn(
                                            "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                                            "bg-white/10 text-gray-300",
                                            "transition-colors duration-300 group-hover:bg-white/20"
                                        )}
                                    >
                                        {item.status}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-medium text-white tracking-tight text-lg">
                                    {item.title}
                                    {item.meta && (
                                        <span className="ml-2 text-xs text-gray-400 font-normal">
                                            {item.meta}
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-[425]">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-white/10"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                {item.cta || "View Details"} <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>

                    {/* Hover Gradient Border Effect */}
                    <div
                        className={cn(
                            "absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-white/10 to-transparent",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                            "transition-opacity duration-300"
                        )}
                    />
                </div>
            ))}
        </div>
    );
}
