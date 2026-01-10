"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export const AILoader = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="loader-wrapper relative flex items-center gap-1">
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.9s]">G</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.8s]">e</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.7s]">n</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.6s]">e</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.5s]">r</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.4s]">a</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.3s]">t</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.2s]">i</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce [animation-delay:-0.1s]">n</span>
                <span className="loader-letter text-emerald-500 font-bold text-xl animate-bounce">g</span>

                <div className="loader ml-4 h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <style jsx>{`
        .loader-letter {
          display: inline-block;
          animation: bounce 1.2s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
        </div>
    );
};
