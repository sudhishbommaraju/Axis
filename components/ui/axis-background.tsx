import { Scene } from "./hero-section";
import { cn } from "@/lib/utils";

interface AxisBackgroundProps {
    className?: string;
}

export function AxisBackground({ className }: AxisBackgroundProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "absolute inset-0 z-0 pointer-events-none overflow-hidden",
                "bg-black", // Fallback color
                className
            )}
        >
            <Scene />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none" />
        </div>
    );
}
