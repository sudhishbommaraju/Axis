"use client"
import { Home, Info, FileText, Shield, LogIn } from "lucide-react";
import { NavBar } from "./tubelight-navbar";

export function AxisNavBar() {
    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'About', url: '/#about', icon: Info },
        { name: 'Docs', url: '/docs', icon: FileText },
        { name: 'Security', url: '/security', icon: Shield },
        { name: 'Login', url: '/login', icon: LogIn }
    ];
    return <NavBar items={navItems} />;
}
