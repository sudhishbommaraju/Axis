import { Scene } from "./hero-section";
import { cn } from "@/lib/utils";

interface AxisBackgroundProps {
    className?: string;
}

export function AxisBackground({ className }: AxisBackgroundProps) {
    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden", className)}>
            <Scene />
            {/* Optional: Add a subtle gradient overlay to ensure text readability if the 3D scene is too bright */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        </div>
    );
}
