
"use client";

import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32">
            <div className="max-w-4xl mx-auto px-6 pb-24 space-y-12 animate-in fade-in duration-700">

                <div className="space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">
                        <Scale className="w-3 h-3" />
                        <span>LEGAL_PROTOCOL_V1</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white animate-in slide-in-from-left-2 duration-500">Terms of Service</h1>
                    <p className="text-xl text-neutral-400 max-w-2xl">
                        Governing protocols for the Axis Decision Authority Layer.
                    </p>
                    <p className="text-sm text-neutral-500">Last updated: January 10, 2026</p>
                </div>

                <div className="prose prose-invert prose-emerald max-w-none space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            By accessing or using the Axis web application (the “Service”), you agree to be bound by these Terms of Service and all policies referenced herein. You must accept and comply with these Terms to use the Service. For example, many SaaS Terms start with language like “By clicking ‘I Agree’ or accessing our Service, you acknowledge that you have read, understood, and agree to be bound by these ToS”. We may update these Terms from time to time; continued use of Axis after any changes constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Eligibility</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Axis is intended for users who can form legally binding contracts. You must be at least the age of majority (usually 18 in most U.S. states) to use the Service. Users under 18 may use Axis only with the consent of a parent or guardian. Axis does not knowingly collect data from children under 13 and requires compliance with COPPA and other applicable laws. By using Axis, you represent that you meet these eligibility requirements and have not been suspended or banned from the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Description of Services</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Axis is a cloud-based simulation and decision-support platform for local businesses. The Service allows users to input financial and operational data to model business scenarios. For example, Axis enables users to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-neutral-300 marker:text-emerald-500">
                            <li><strong>Simulate Business Decisions:</strong> Model financial and operational inputs (budgets, sales forecasts, staffing levels, etc.) to project outcomes and revenues.</li>
                            <li><strong>View Scenarios:</strong> Compare “what-if” scenarios based on variables such as spending capacity, hiring costs, market demand, and constraints.</li>
                            <li><strong>Financial Integration:</strong> Connect Axis to your bank or financial institution (with your permission) to import account and balance-sheet data for more accurate simulations.</li>
                            <li><strong>Identity-Based Interfaces:</strong> Choose a user role at signup (Owner, Customer, or Applicant) to receive a tailored interface and permissions set, so that each user sees features appropriate to their role.</li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed">
                            These features and any future features or integrations (such as new data sources or analytics modules) are collectively the “Services” provided by Axis.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">User Accounts and Roles</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Certain features of Axis require creating a user account. When you register, you must select one of three user identities: Owner, Customer, or Applicant. Each identity has different permissions and access levels. For example, an Owner account may have full rights to create and manage business simulations and financial data, whereas a Customer or Applicant account may only have restricted views or actions as designated. You agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-neutral-300 marker:text-emerald-500">
                            <li>Provide accurate, current information when registering and maintain it.</li>
                            <li>Keep your login credentials confidential and secure; you are responsible for all activities that occur under your account.</li>
                            <li>Not transfer or share your account or role with anyone else.</li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed">
                            Axis reserves the right to change or restrict roles and permissions, and to close accounts that are inactive or in violation of these Terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">User Data and Privacy</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Axis collects and processes personal, business, and financial information that you provide or authorize (for example, data you enter into simulations and any bank account data you link). All such information is protected under our Privacy Policy, which explains what data we collect, how we use it, and how we protect it. By using the Service, you consent to this data collection and use. We use industry-standard security measures to protect your information. We will not sell your personal data to third parties. If you link financial accounts or other external data sources, Axis will only access and use that data to provide the Service (e.g. running your financial simulations). You should review our full Privacy Policy for details on data rights, retention, and choices.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Payment and Subscriptions</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Axis may be offered on a subscription or fee basis, either now or in the future. Details of any fees, billing schedules, and payment methods will be disclosed on our website and in your account settings. By choosing a paid plan, you agree to pay all fees as specified, plus any applicable taxes. Payments are due according to the billing cycle (e.g. monthly or annual) you select, and will automatically renew until you cancel. You authorize Axis to charge your chosen payment method on the due dates. All payments are non-refundable except as required by law or Axis’s refund policy. You must provide a valid payment method; failure to do so may result in suspension of your account. In short, Axis’s subscription terms will clarify pricing, billing, and refund policies in accordance with standard SaaS practice.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            The Axis platform, including its software, designs, models, documentation, logos, and content (collectively, the “Platform”), is the intellectual property of Axis or its licensors. All rights are reserved. You may not copy, modify, distribute, sell, or create derivative works of the Platform or any Axis content without Axis’s prior written permission. Conversely, you retain ownership of any content or data you upload or enter (“User Content”). By providing User Content to Axis, you grant Axis a perpetual, worldwide, royalty-free license to use, host, reproduce, modify, and display that content as needed to operate and improve the Service. (For example, Axis needs a license to use your financial inputs and simulation data in order to generate reports.) All trademarks, service marks, and logos appearing on Axis are owned by Axis or its affiliates, and you may not use them without permission. Axis respects the intellectual property rights of others and expects you to do the same.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Prohibited Conduct</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            You agree not to misuse Axis or its Services. Prohibited uses include (but are not limited to):
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-neutral-300 marker:text-emerald-500">
                            <li><strong>Illegal or Unauthorized Use:</strong> Using the Service for any illegal purpose or to facilitate any crimes.</li>
                            <li><strong>Security Violations:</strong> Attempting to probe, scan, or test the vulnerability of any system or network, or to breach Axis’s security or authentication measures. You may not reverse-engineer, decompile, or disassemble the Platform or use automated tools (bots, scrapers, etc.) to access data.</li>
                            <li><strong>Harassment and Spam:</strong> Sending unsolicited advertising or spam messages. Harassing, abusing, or harming others in any way (including through hate speech, threats, or obscene language) is prohibited.</li>
                            <li><strong>Intellectual Property Infringement:</strong> Uploading or distributing content that infringes on any third party’s copyrights, trademarks, or other rights.</li>
                            <li><strong>Malicious Content:</strong> Uploading malware, viruses, or any harmful code. You must not upload or transmit material that is unlawful, defamatory, pornographic, or violates any right of privacy or publicity.</li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed">
                            Axis may immediately suspend or terminate access for any user found engaging in prohibited conduct. This list is illustrative, not exhaustive. You are responsible for any use of the Service by you or anyone using your account.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Disclaimers and Limitation of Liability</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            <strong>Disclaimer of Warranties:</strong> The Axis Service is provided “as is” and “as available,” with all faults and without warranty of any kind. Axis expressly disclaims all warranties, whether express or implied, including without limitation any implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Axis does not guarantee that the Service will be secure, accurate, complete, or uninterrupted. You assume all risk for any results obtained or decisions made based on the Service.
                        </p>
                        <p className="text-neutral-300 leading-relaxed">
                            <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, Axis (and its officers, directors, employees, and affiliates) will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunity, arising out of or related to your use of the Service, even if Axis has been advised of the possibility of such damages. Axis’s total liability for any claim arising from or related to the Service will not exceed the amount you have paid Axis in the past twelve months (or $100 if you have paid nothing). These limitations apply even if the above-stated remedies fail of their essential purpose. These disclaimers and limitations mirror standard SaaS practice to limit liability to the fullest extent allowed by law.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Termination</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Axis reserves the right to suspend or terminate your access to the Service at any time, without notice and at its sole discretion. Reasons for termination include violation of these Terms, inactivity, or discontinuation of the Service. (For example, Square’s Terms explicitly state that it may terminate a user account “for any reason whatsoever”.) Upon termination, your right to use Axis ceases immediately, and Axis may delete or deactivate your data. If you wish to terminate your account, you may do so by following the account closure procedures in the application or by contacting support. Any unpaid fees to Axis prior to termination remain due, and Axis will not refund any remaining subscription term except as required by law.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Governing Law</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            These Terms and any disputes arising under them shall be governed by and construed in accordance with the laws of the State of Texas (or another state you choose), without regard to its conflict of laws principles. (For example: “All legal issues arising under these terms will be governed by Texas law”.) You and Axis agree to submit to the exclusive jurisdiction of the state or federal courts located in that state for any legal action arising out of these Terms.
                        </p>
                    </section>

                    <section className="space-y-4 border-t border-white/10 pt-8">
                        <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            If you have any questions about these Terms, please contact Axis support at <a href="mailto:support@axis.com" className="text-emerald-500 hover:text-emerald-400">support@axis.com</a>.
                        </p>
                    </section>
                </div>

                <div className="flex items-center gap-4 text-sm text-emerald-500 bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p>By using Axis, you cryptographically sign and acknowledge these terms.</p>
                </div>
            </div>
            <SiteFooter />
        </div>
    );
}
