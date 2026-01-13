import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getRole } from "@/app/actions/auth";
import { OwnerOnboardingForm } from "@/components/onboarding/owner-form";
import { CustomerOnboardingForm } from "@/components/onboarding/customer-form";
import { ApplicantOnboardingForm } from "@/components/onboarding/applicant-form";

export const dynamic = 'force-dynamic';

async function OnboardingContent() {
    const role = await getRole();

    if (!role) {
        // During build time, role is undefined. 
        // We shouldn't redirect here as it can break static analysis.
        // Middleware handles the actual protection.
        return (
            <div className="flex h-screen items-center justify-center text-white">
                <div className="text-center">
                    <p className="mb-4">Session expired or invalid.</p>
                    <a href="/login" className="text-emerald-500 hover:underline">Return to Login</a>
                </div>
            </div>
        );
    }

    if (role === 'owner') {
        return <OwnerOnboardingForm />;
    } else if (role === 'customer') {
        return <CustomerOnboardingForm />;
    } else if (role === 'applicant') {
        return <ApplicantOnboardingForm />;
    }

    return <div>Invalid Role Configuration.</div>;
}

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
            <OnboardingContent />
        </Suspense>
    );
}
