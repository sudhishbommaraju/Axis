import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Wallet, LineChart, ShieldCheck, LogOut, Settings } from 'lucide-react';
import { logout } from '@/app/actions/auth';

export default function OwnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-black text-white selection:bg-emerald-500/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-neutral-950/50 hidden md:flex flex-col fixed h-full z-40">
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                    <span className="font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                        AXIS // OWNER
                    </span>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1">
                    <NavLink href="/platform/owner" icon={LayoutDashboard} label="Control Center" active />
                    <NavLink href="#" icon={Wallet} label="Capital" />
                    <NavLink href="#" icon={LineChart} label="Simulations" />
                    <NavLink href="#" icon={ShieldCheck} label="Constraints" />
                </div>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-neutral-400 hover:text-white hover:bg-white/5" asChild>
                        <Link href="#"><Settings className="w-4 h-4 mr-2" /> Settings</Link>
                    </Button>
                    <form action={logout}>
                        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10" type="submit">
                            <LogOut className="w-4 h-4 mr-2" /> Disconnect
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 bg-black min-h-screen relative">
                {/* Mobile Header (TODO if needed) */}
                <div className="md:hidden h-16 border-b border-white/10 flex items-center px-6 justify-between bg-neutral-950">
                    <span className="font-bold">AXIS // OWNER</span>
                    {/* Mobile menu trigger would go here */}
                </div>

                <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavLink({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${active
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-neutral-500 group-hover:text-white'}`} />
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}
