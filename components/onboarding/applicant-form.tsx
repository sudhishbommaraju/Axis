"use client";

import { useState } from "react";
import { completeOnboarding } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FileText, Briefcase } from "lucide-react";

export function ApplicantOnboardingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', currentRole: '' });

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await completeOnboarding('applicant', formData);
    };

    return (
        <Card className="max-w-md mx-auto bg-neutral-950 border-white/10 p-8 space-y-6">
            <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                    <Briefcase className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">Career Profile</h2>
                <p className="text-neutral-400 text-sm">Build your professional presence.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                    <Label>Full Name</Label>
                    <Input
                        placeholder="John Smith"
                        className="bg-white/5 border-white/10 text-white"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </div>
                <div className="space-y-1">
                    <Label>Current Role</Label>
                    <Input
                        placeholder="e.g. Software Engineer"
                        className="bg-white/5 border-white/10 text-white"
                        value={formData.currentRole}
                        onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    />
                </div>

                <div className="pt-4 border-t border-white/10">
                    <div className="border border-dashed border-white/20 rounded-lg p-6 text-center hover:bg-white/5 transition-colors cursor-pointer">
                        <FileText className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                        <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Upload Resume</p>
                        <p className="text-[10px] text-neutral-600 mt-1">PDF or DOCX (Max 5MB)</p>
                    </div>
                </div>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white hover:bg-blue-500 font-bold"
            >
                {isSubmitting ? "Finalizing..." : "Submit Profile"}
            </Button>
        </Card>
    );
}
