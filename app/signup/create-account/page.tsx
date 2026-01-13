'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { signup } from '@/app/actions/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from 'lucide-react';

function SignupFormContent() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User';

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError('');

        // Append role to formData
        if (role) {
            formData.append('role', role);
        }

        try {
            await signup(formData);
        } catch (e) {
            setError((e as Error).message || "An error occurred during signup");
            setIsLoading(false);
        }
    }

    if (!role) {
        return (
            <Card className="max-w-md mx-auto bg-neutral-900 border-red-900/50">
                <CardContent className="pt-6 text-center text-red-400">
                    No role selected. Please go back and choose an account type.
                    <Button variant="link" className="text-white block mx-auto mt-4" asChild>
                        <Link href="/signup">Return to Selection</Link>
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="max-w-md w-full mx-auto border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <div className="flex items-center mb-4">
                    <Link href="/signup" className="text-sm text-neutral-500 hover:text-white flex items-center transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Link>
                </div>
                <CardTitle className="text-2xl font-bold text-white">Create {displayRole} Account</CardTitle>
                <CardDescription className="text-neutral-200">
                    Enter your details to start your {role} journey on Axis.
                </CardDescription>
            </CardHeader>
            <form action={handleSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-neutral-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="bg-white/5 border-white/10 text-white placeholder:text-neutral-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <SignupFormContent />
            </Suspense>
        </div>
    );
}
