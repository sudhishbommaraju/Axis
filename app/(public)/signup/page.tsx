"use client"

import { AuthComponent } from "@/components/ui/sign-up";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function SignupPage() {
    useEffect(() => {
        console.log("SignupPage [Axis Authority Integration] Mounting...");
    }, []);



    return (
        <AuthComponent
            brandName="Axis"
        />
    );
}
