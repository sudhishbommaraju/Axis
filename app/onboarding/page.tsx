import { redirect } from "next/navigation";
import { getRole } from "@/app/actions/auth";
import { OwnerOnboardingForm } from "@/components/onboarding/owner-form";
import { CustomerOnboardingForm } from "@/components/onboarding/customer-form";
import { ApplicantOnboardingForm } from "@/components/onboarding/applicant-form";

export default async function OnboardingPage() {
    const role = await getRole();

    if (!role) {
        redirect('/');
    }

    // Route to appropriate form based on role
    if (role === 'owner') {
        return <OwnerOnboardingForm />;
    } else if (role === 'customer') {
        return <CustomerOnboardingForm />;
    } else if (role === 'applicant') {
        return <ApplicantOnboardingForm />;
    }

    return <div>Invalid Role Configuration.</div>;
}
