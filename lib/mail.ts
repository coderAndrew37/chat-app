// lib/mail.ts
//
// Single source of truth for all transactional emails.
// All email sending goes through this file — nothing else calls Resend directly.

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = "Chat254 <noreply@contact.sleeksites.co.ke>"; // must match your verified Resend domain
const APP_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// ─── Shared styles ────────────────────────────────────────────────────────────

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:480px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f3f4f6;">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#f43f5e,#fb7185);padding:36px 40px 28px;text-align:center;">
                <div style="font-size:32px;margin-bottom:6px;">❤️</div>
                <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Chat254</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Kenya&apos;s #1 Dating App</p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:32px 40px;">
                ${content}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:0 40px 28px;text-align:center;">
                <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;" />
                <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.5;">
                  Chat254 · Nairobi, Kenya<br/>
                  <a href="${APP_URL}/privacy" style="color:#f43f5e;text-decoration:none;">Privacy</a>
                  &nbsp;·&nbsp;
                  <a href="${APP_URL}/terms" style="color:#f43f5e;text-decoration:none;">Terms</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

const ctaButton = (href: string, label: string) => `
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:8px 0 20px;">
        <a href="${href}"
          style="display:inline-block;background:#f43f5e;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 40px;border-radius:50px;">
          ${label}
        </a>
      </td>
    </tr>
  </table>
`;

// ─── Confirmation email ───────────────────────────────────────────────────────

interface ConfirmationEmailParams {
  email: string;
  name: string;
  confirmationUrl: string;
}

export async function sendConfirmationEmail({
  email,
  name,
  confirmationUrl,
}: ConfirmationEmailParams): Promise<{ error: Error | null }> {
  const firstName = name.split(" ")[0];

  const html = baseTemplate(`
    <h2 style="margin:0 0 12px;color:#111827;font-size:20px;font-weight:800;">
      Hi ${firstName}, you&apos;re almost in! 👋
    </h2>
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
      Thanks for joining Chat254. Click the button below to confirm your email
      and activate your account.
    </p>
    ${ctaButton(confirmationUrl, "Confirm My Account →")}
    <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
      This link expires in <strong>24 hours</strong>. If you didn&apos;t create
      a Chat254 account, you can safely ignore this email.
    </p>
  `);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Confirm your Chat254 account ❤️",
      html,
    });

    if (error) {
      console.error("[mail/sendConfirmationEmail] Resend error:", error);
      return { error: new Error(String(error)) };
    }

    return { error: null };
  } catch (err) {
    console.error("[mail/sendConfirmationEmail] unexpected error:", err);
    return { error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// ─── Password reset email ─────────────────────────────────────────────────────

interface PasswordResetEmailParams {
  email: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail({
  email,
  resetUrl,
}: PasswordResetEmailParams): Promise<{ error: Error | null }> {
  const html = baseTemplate(`
    <h2 style="margin:0 0 12px;color:#111827;font-size:20px;font-weight:800;">
      Reset your password 🔐
    </h2>
    <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
      We received a request to reset your Chat254 password. Click the button
      below to set a new one.
    </p>
    ${ctaButton(resetUrl, "Reset My Password →")}
    <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
      This link expires in <strong>1 hour</strong>. If you didn&apos;t request
      a password reset, you can safely ignore this email — your password will
      not change.
    </p>
  `);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Reset your Chat254 password 🔐",
      html,
    });

    if (error) {
      console.error("[mail/sendPasswordResetEmail] Resend error:", error);
      return { error: new Error(String(error)) };
    }

    return { error: null };
  } catch (err) {
    console.error("[mail/sendPasswordResetEmail] unexpected error:", err);
    return { error: err instanceof Error ? err : new Error(String(err)) };
  }
}