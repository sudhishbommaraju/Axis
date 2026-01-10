"use client";

import { useState } from "react";
import { completeOnboarding } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, Wallet, Activity, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type Step = 'basics' | 'ops' | 'financials' | 'constraints';

const STEPS: { id: Step; label: string; icon: any }[] = [
    { id: 'basics', label: 'Identity', icon: Building2 },
    { id: 'ops', label: 'Operations', icon: Activity },
    { id: 'financials', label: 'Capital', icon: Wallet },
    { id: 'constraints', label: 'Controls', icon: ShieldCheck },
];

export function OwnerOnboardingForm() {
    const [currentStep, setCurrentStep] = useState<Step>('basics');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // Basics
        businessName: '',
        industry: '',
        stage: 'early',
        location: '',

        // Ops
        model: 'service', // service, product, hybrid
        seasonal: 'no',
        employeeCount: '',

        // Financials
        revenue: '',
        fixedCosts: '',
        payroll: '', // headcount or $? prompt says payroll size. let's assume $.
        hiringFreq: 'occasional',

        // Constraints
        minRunway: '6',
        riskTolerance: 'medium'
    });

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex < STEPS.length - 1) {
            setCurrentStep(STEPS[currentIndex + 1].id);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        const currentIndex = STEPS.findIndex(s => s.id === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(STEPS[currentIndex - 1].id);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Here we would sync the collected data to the user's profile/DB
        // For now, we simulate the save and complete the session.
        await completeOnboarding('owner');
    };

    // Render Steps
    const renderStepContent = () => {
        switch (currentStep) {
            case 'basics':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-1">
                            <Label>Business Name</Label>
                            <Input placeholder="Acme Corp" value={formData.businessName} onChange={e => updateField('businessName', e.target.value)} className="bg-white/5 border-white/10 text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Industry</Label>
                                <Select onValueChange={v => updateField('industry', v)} value={formData.industry}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue placeholder="Select..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tech">Technology / SaaS</SelectItem>
                                        <SelectItem value="retail">Retail / E-comm</SelectItem>
                                        <SelectItem value="prof_services">Professional Services</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label>Stage</Label>
                                <Select onValueChange={v => updateField('stage', v)} value={formData.stage}>
                                    <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="early">Early (Pre-Rev)</SelectItem>
                                        <SelectItem value="growing">Scaling (Rev+)</SelectItem>
                                        <SelectItem value="mature">Optimizing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label>HQ Location</Label>
                            <Input placeholder="City, State" value={formData.location} onChange={e => updateField('location', e.target.value)} className="bg-white/5 border-white/10 text-white" />
                        </div>
                    </div>
                );
            case 'ops':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-1">
                            <Label>Primary Model</Label>
                            <div className="grid grid-cols-3 gap-3">
                                {['service', 'product', 'hybrid'].map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => updateField('model', m)}
                                        className={cn(
                                            "p-3 rounded-lg border text-sm font-medium transition-all capitalize",
                                            formData.model === m
                                                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                                : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                                        )}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label>Seasonality</Label>
                            <Select onValueChange={v => updateField('seasonal', v)} value={formData.seasonal}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="no">Consistent Revenue</SelectItem>
                                    <SelectItem value="yes">Highly Seasonal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label>Employee Count</Label>
                            <Input type="number" placeholder="10" value={formData.employeeCount} onChange={e => updateField('employeeCount', e.target.value)} className="bg-white/5 border-white/10 text-white" />
                        </div>
                    </div>
                );
            case 'financials':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="p-3 bg-neutral-900/50 border border-white/10 rounded-lg text-xs text-neutral-400 mb-4">
                            <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-500" />
                            Estimates are acceptable. Used for baseline constraint modeling only.
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Monthly Revenue</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">$</span>
                                    <Input type="number" placeholder="50000" className="pl-6 bg-white/5 border-white/10 text-white font-mono" value={formData.revenue} onChange={e => updateField('revenue', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label>Fixed Costs</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">$</span>
                                    <Input type="number" placeholder="20000" className="pl-6 bg-white/5 border-white/10 text-white font-mono" value={formData.fixedCosts} onChange={e => updateField('fixedCosts', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label>Monthly Payroll</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">$</span>
                                <Input type="number" placeholder="15000" className="pl-6 bg-white/5 border-white/10 text-white font-mono" value={formData.payroll} onChange={e => updateField('payroll', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label>Hiring Frequency</Label>
                            <Select onValueChange={v => updateField('hiringFreq', v)} value={formData.hiringFreq}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rare">Rare (1-2 / yr)</SelectItem>
                                    <SelectItem value="occasional">Occasional (1-2 / qtr)</SelectItem>
                                    <SelectItem value="frequent">Frequent (Monthly)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                );
            case 'constraints':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="p-3 bg-neutral-900/50 border border-white/10 rounded-lg text-xs text-neutral-400 mb-4">
                            <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-500" />
                            Axis will alert you if simulations breach these thresholds.
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <Label>Min Runway Guarantee</Label>
                                    <span className="font-mono text-emerald-400">{formData.minRunway} Mo</span>
                                </div>
                                <Input
                                    type="range" min="1" max="24" step="1"
                                    value={formData.minRunway}
                                    onChange={(e) => updateField('minRunway', e.target.value)}
                                    className="accent-emerald-500 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                                />
                                <p className="text-[10px] text-neutral-500">
                                    If cash reserves drop below {formData.minRunway} months of burn, simulations will fail.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <Label>Risk Tolerance</Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['low', 'medium', 'high'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => updateField('riskTolerance', t)}
                                            className={cn(
                                                "p-3 rounded-lg border text-sm font-medium transition-all capitalize",
                                                formData.riskTolerance === t
                                                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                                    : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <Card className="bg-neutral-950 border-white/10 overflow-hidden">
            {/* Header / Steps */}
            <div className="border-b border-white/10 p-6 bg-black">
                <div className="flex items-center justify-between mb-8">
                    {STEPS.map((step, idx) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = STEPS.findIndex(s => s.id === currentStep) > idx;

                        return (
                            <div key={step.id} className="flex items-center">
                                <div className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-full border text-xs transition-colors",
                                    isActive ? "bg-emerald-500 text-black border-emerald-500 font-bold" :
                                        isCompleted ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/50" :
                                            "bg-neutral-900 text-neutral-500 border-white/10"
                                )}>
                                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div className={cn(
                                        "w-8 h-[1px] mx-2",
                                        isCompleted ? "bg-emerald-500/50" : "bg-white/10"
                                    )} />
                                )}
                            </div>
                        );
                    })}
                </div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {STEPS.find(s => s.id === currentStep)?.icon && (
                        <span className="p-1 rounded bg-white/10"><Activity className="w-4 h-4" /></span>
                    )}
                    {STEPS.find(s => s.id === currentStep)?.label}
                </h2>
                <p className="text-sm text-neutral-500">Step {STEPS.findIndex(s => s.id === currentStep) + 1} of {STEPS.length}</p>
            </div>

            {/* Form Content */}
            <div className="p-6 min-h-[300px] flex flex-col">
                <div className="flex-1">
                    {renderStepContent()}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between pt-8 mt-4 border-t border-white/5">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        disabled={currentStep === 'basics' || isSubmitting}
                        className="text-neutral-400 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="bg-emerald-500 text-black hover:bg-emerald-400 font-bold px-8"
                    >
                        {isSubmitting ? "Finalizing..." : currentStep === 'constraints' ? "Complete & Enter" : "Next"}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
