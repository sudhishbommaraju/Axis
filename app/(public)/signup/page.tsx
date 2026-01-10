"use client"
import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { useRouter } from "next/navigation";

const sampleTestimonials: Testimonial[] = [
    {
        avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&fit=crop",
        name: "Sarah Chen",
        handle: "@sarahdigital",
        text: "Joining Axis was the best decision for our team's operational rhythm."
    }
];

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push('/login');
    };

    return (
        <SignInPage
            title={<>Begin <span className="text-emerald-500">Assertion</span></>}
            description="Create your Axis authority credentials"
            heroImageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2160&q=80"
            testimonials={sampleTestimonials}
            onSignIn={handleSignup}
            onCreateAccount={() => router.push('/login')}
        />
    );
}
