import { notFound } from "next/navigation";
import { getPublicProfile } from "@/app/actions/profile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MessageSquare, Eye, ShieldCheck, User, Calendar, MapPin, Globe } from "lucide-react";
import Link from "next/link";

export default async function PublicProfilePage({ params }: { params: { userId: string } }) {
    const profile = await getPublicProfile(params.userId);

    if (!profile) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-8">
            {/* Header / Hero */}
            <div className="relative">
                <div className="h-48 w-full bg-gradient-to-r from-emerald-900/20 to-neutral-900 rounded-2xl border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>
                <div className="absolute -bottom-16 left-8 flex items-end">
                    <div className="w-32 h-32 rounded-2xl bg-black border-4 border-black shadow-2xl flex items-center justify-center overflow-hidden relative group">
                        {/* Placeholder Avatar */}
                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-4xl font-bold text-neutral-500">
                            {profile.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-12 right-0 flex gap-3">
                    {profile.isOwnProfile ? (
                        <Button disabled variant="outline" className="bg-black/50 border-white/10 text-neutral-400">
                            Edit Profile
                        </Button>
                    ) : (
                        <Button className="bg-emerald-500 text-black hover:bg-emerald-400 font-bold" asChild>
                            <Link href={`/platform/messages?to=${profile.id}`}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Message
                            </Link>
                        </Button>
                    )}
                </div>
            </div>

            {/* Profile Info */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content (Left 2 cols) */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-white">{profile.businessName || profile.name}</h1>
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 capitalize">
                                {profile.role}
                            </Badge>
                        </div>
                        {profile.businessName && (
                            <p className="text-neutral-400 flex items-center gap-2">
                                <User className="w-4 h-4" /> Operated by {profile.name}
                            </p>
                        )}
                    </div>

                    <Card className="bg-neutral-950 border-white/10 p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white">About</h3>
                        <p className="text-neutral-400 leading-relaxed">
                            {profile.bio || "No bio information provided yet."}
                        </p>
                    </Card>

                    {/* Stats Section (Owner Only) */}
                    {profile.isOwnProfile && (
                        <Card className="bg-emerald-950/20 border-emerald-500/20 p-6">
                            <h3 className="text-lg font-bold text-emerald-500 mb-4 flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-2" />
                                Private Analytics
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-black/40 rounded-lg border border-emerald-500/10 flex items-center justify-between">
                                    <span className="text-neutral-400 text-sm">Profile Visits</span>
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-emerald-500" />
                                        <span className="text-2xl font-mono font-bold text-emerald-400">
                                            {profile.visitCount || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar (Right col) */}
                <div className="space-y-6">
                    <Card className="bg-neutral-900/50 border-white/10 p-6 space-y-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-500">Details</h3>

                        <div className="space-y-3">
                            {profile.industry && (
                                <div className="flex items-center gap-3 text-sm text-neutral-300">
                                    <Building2 className="w-4 h-4 text-neutral-500" />
                                    <span>{profile.industry === 'tech' ? 'Technology' : profile.industry}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <Calendar className="w-4 h-4 text-neutral-500" />
                                <span>Joined {new Date(profile.joinedAt).toLocaleDateString()}</span>
                            </div>
                            {/* Mock Location */}
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <MapPin className="w-4 h-4 text-neutral-500" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
