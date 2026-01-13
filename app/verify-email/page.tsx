'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEmail } from '@/app/actions/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Mail, ArrowRight } from 'lucide-react';
import { Label } from "@/components/ui/label";

function VerifyEmailForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email') || '';
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await verifyEmail(email, code);
            // Action validates and redirects
        } catch (e) {
            setError((e as Error).message || "Verification failed");
            setIsLoading(false);
        }
    }

    if (!email) {
        return (
            <div className="text-center text-neutral-400">
                Invalid verification link.
                <Button variant="link" onClick={() => router.push('/signup')} className="text-white block mx-auto">
                    Return to Signup
                </Button>
            </div>
        );
    }

    return (
        <Card className="max-w-md w-full mx-auto border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-emerald-500" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Check your email</CardTitle>
                <CardDescription className="text-neutral-200">
                    We sent a verification code to <span className="font-medium text-white">{email}</span>
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="code" className="text-white">Verification Code</Label>
                        <Input
                            id="code"
                            name="code"
                            placeholder="123456"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-white/5 border-white/10 text-white text-center text-2xl tracking-[0.5em] placeholder:text-neutral-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 font-mono"
                            maxLength={6}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
                        disabled={isLoading || code.length !== 6}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify Email"}
                        {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                    <p className="text-xs text-neutral-500 text-center">
                        Didn't receive the code? check your console/logs (Dev Mode)
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-black">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <VerifyEmailForm />
            </Suspense>
        </div>
    );
}
