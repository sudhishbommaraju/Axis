import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">Access Denied</h1>
                <p className="text-neutral-400 max-w-md mx-auto">
                    You do not have the required <strong>Owner</strong> privileges to access this area.
                    This section contains sensitive financial controls and simulations.
                </p>
            </div>

            <div className="pt-4">
                <Button asChild variant="outline" className="border-white/10 hover:bg-white/10">
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}
