"use client";

import { useState } from "react";
import { completeOnboarding } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { User, Sparkles } from "lucide-react";

export function CustomerOnboardingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await completeOnboarding('customer');
    };

    return (
        <Card className="max-w-md mx-auto bg-neutral-950 border-white/10 p-8 space-y-6">
            <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <User className="w-6 h-6 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">Customer Profile</h2>
                <p className="text-neutral-400 text-sm">Create your identity to interact with businesses on Axis.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <Label>Full Name</Label>
                    <Input placeholder="Jane Doe" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-1">
                    <Label>Bio (Optional)</Label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell us a bit about yourself..."
                    />
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-black hover:bg-emerald-400 font-bold"
            >
                {isSubmitting ? "Creating Profile..." : "Complete Setup"}
                <Sparkles className="w-4 h-4 ml-2" />
            </Button>
        </Card>
    );
}
