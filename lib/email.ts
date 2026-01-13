import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Skipping email send (Mock Mode).");
        return;
    }

    try {
        await resend.emails.send({
            from: 'Axis <onboarding@resend.dev>', // Default Resend testing domain
            to: email,
            subject: 'Verify your Axis account',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #10b981;">Welcome to Axis</h1>
                    <p>Please use the following code to verify your account:</p>
                    <div style="background: #f4f4f5; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 0.5em; color: #000;">${code}</span>
                    </div>
                    <p style="color: #666; font-size: 14px;">If you didn't request this code, you can ignore this email.</p>
                </div>
            `
        });
        console.log(`[EMAIL] Sent verification code to ${email}`);
    } catch (error) {
        console.error("[EMAIL] Failed to send email:", error);
        // Don't throw, just log. We can still verify via console if email fails.
    }
}
