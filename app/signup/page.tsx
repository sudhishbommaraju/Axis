"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, Search, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "owner" | "customer" | "applicant";

const ROLES: { id: Role; title: string; description: string; icon: React.ElementType; color: string; bg: string; border: string; activeBorder: string }[] = [
    {
        id: "owner",
        title: "Business Owner",
        description: "I run a company and want to manage hiring, capital, and operations.",
        icon: Building2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        activeBorder: "border-emerald-500",
    },
    {
        id: "customer",
        title: "Customer",
        description: "I am a client looking to connect with businesses on Axis.",
        icon: User,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        activeBorder: "border-blue-500",
    },
    {
        id: "applicant",
        title: "Job Applicant",
        description: "I am looking for career opportunities and job listings.",
        icon: Search,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        activeBorder: "border-purple-500",
    },
];

export default function RoleSelectionPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isNavigating, setIsNavigating] = useState(false);

    const handleSelect = (roleId: Role) => {
        if (isNavigating) return;
        setSelectedRole(roleId);

        // Add a small delay for visual feedback before navigation
        setIsNavigating(true);
        setTimeout(() => {
            router.push(`/signup/create-account?role=${roleId}`);
        }, 400);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-black">
            <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in duration-700">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Choose your path
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-lg mx-auto">
                        Axis provides tailored experiences for owners, customers, and applicants.
                        Select how you intend to use the platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ROLES.map((role) => {
                        const isSelected = selectedRole === role.id;
                        const isOtherSelected = selectedRole !== null && !isSelected;

                        return (
                            <button
                                key={role.id}
                                onClick={() => handleSelect(role.id)}
                                disabled={isNavigating}
                                className={cn(
                                    "group relative h-full text-left transition-all duration-300 outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl",
                                    "hover:-translate-y-2",
                                    isOtherSelected && "opacity-50 scale-95",
                                    isSelected && "scale-105 ring-2 ring-emerald-500 shadow-2xl shadow-emerald-900/20"
                                )}
                            >
                                <Card className={cn(
                                    "h-full bg-neutral-900/50 backdrop-blur-sm transition-all duration-300",
                                    "border",
                                    isSelected ? role.activeBorder : "border-white/10 group-hover:border-white/20"
                                )}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div className={cn(
                                                "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                                                role.bg
                                            )}>
                                                <role.icon className={cn("w-6 h-6", role.color)} />
                                            </div>
                                            {isSelected && (
                                                <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-in fade-in zoom-in" />
                                            )}
                                        </div>
                                        <CardTitle className="text-xl text-white group-hover:text-emerald-400 transition-colors">
                                            {role.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <CardDescription className="text-neutral-400 text-base">
                                            {role.description}
                                        </CardDescription>
                                        <div className={cn(
                                            "flex items-center text-sm font-medium transition-all duration-300",
                                            isSelected ? "text-emerald-400 opacity-100 translate-x-0" : "text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                        )}>
                                            {isNavigating && isSelected ? "Continuing..." : "Get Started"}
                                            {isNavigating && isSelected ? <Loader2 className="w-4 h-4 ml-2 animate-spin" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                                        </div>
                                    </CardContent>
                                </Card>
                            </button>
                        );
                    })}
                </div>

                <div className="text-sm text-neutral-500">
                    Already have an account?
                    <button
                        onClick={() => router.push('/login')}
                        className="ml-1 text-white underline underline-offset-4 hover:text-emerald-400 transition-colors"
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}
