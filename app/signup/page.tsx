"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, Search, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "owner" | "customer" | "applicant";

const ROLES: { id: Role; title: string; description: string; icon: any; color: string; bg: string; border: string; activeBorder: string }[] = [
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
        setSelectedRole(roleId);
    };

    const handleContinue = () => {
        if (!selectedRole) return;
        setIsNavigating(true);
        router.push(`/signup/create-account?role=${selectedRole}`);
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
                                type="button"
                                className={cn(
                                    "group relative h-full text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-xl",
                                    "hover:-translate-y-1",
                                    isOtherSelected && "opacity-50 scale-95 hover:opacity-100 hover:scale-100",
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
                                    </CardContent>
                                </Card>
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col items-center gap-6 pt-8">
                    <Button
                        onClick={handleContinue}
                        disabled={!selectedRole || isNavigating}
                        className={cn(
                            "px-12 py-6 text-lg font-bold rounded-2xl transition-all duration-300",
                            selectedRole
                                ? "bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                : "bg-white/5 text-neutral-500 cursor-not-allowed hover:bg-white/5"
                        )}
                    >
                        {isNavigating ? (
                            <>Continuing <Loader2 className="w-5 h-5 ml-2 animate-spin" /></>
                        ) : (
                            <>
                                Continue as {selectedRole ? ROLES.find(r => r.id === selectedRole)?.title : "..."}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </Button>

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
        </div>
    );
}
