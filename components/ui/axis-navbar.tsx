"use client"
import { Home, Info, FileText, Shield, LogIn, UserPlus, Activity } from "lucide-react";
import { NavBar } from "./tubelight-navbar";

export function AxisNavBar() {
    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'About', url: '/#about', icon: Info },
        { name: 'Demo', url: '/demo', icon: Activity },
        { name: 'Docs', url: '/docs', icon: FileText },
        { name: 'Security', url: '/security', icon: Shield },
        { name: 'Login', url: '/login', icon: LogIn },
        { name: 'Get Started', url: '/signup', icon: UserPlus, special: true }
    ];
    return <NavBar items={navItems} />;
}
