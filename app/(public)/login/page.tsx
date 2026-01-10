"use client"
import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { useRouter } from "next/navigation";

const sampleTestimonials: Testimonial[] = [
    {
        avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&fit=crop",
        name: "Sarah Chen",
        handle: "@sarahdigital",
        text: "Axis has transformed how we manage our capital allocation. The clarity is unparalleled."
    },
    {
        avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&fit=crop",
        name: "Marcus Johnson",
        handle: "@marcustech",
        text: "The decision authority layer we were missing. Professional, robust, and essential."
    },
    {
        avatarSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&q=80&fit=crop",
        name: "Elena Rodriguez",
        handle: "@elenacapital",
        text: "Cleanest financial interface I've ever used. Axis just works."
    },
];

export default function LoginPage() {
    const router = useRouter();

    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // In a real app, you would handle authentication here
        router.push('/');
    };

    const handleGoogleSignIn = () => {
        console.log("Google Sign In");
    };

    const handleResetPassword = () => {
        console.log("Reset Password");
    }

    const handleCreateAccount = () => {
        router.push('/signup');
    }

    return (
        <SignInPage
            title={<>Enforce <span className="text-emerald-500">Order</span></>}
            description="Access the Axis Decision Authority Layer"
            heroImageSrc="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=2160&q=80"
            testimonials={sampleTestimonials}
            onSignIn={handleSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            onResetPassword={handleResetPassword}
            onCreateAccount={handleCreateAccount}
        />
    );
}
