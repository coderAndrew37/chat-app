// lib/mail.ts
//
// All transactional emails sent via Resend.
// Supabase's built-in email is disabled — we own every send.
//
// Required env vars:
//   RESEND_API_KEY        — from resend.com/api-keys
//   RESEND_FROM_EMAIL     — verified sender e.g. "Chat254 <noreply@chat254.co.ke>"
//   NEXT_PUBLIC_SITE_URL  — e.g. "https://chat254.co.ke"

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? "Chat254 <noreply@chat254.co.ke>";

// ─── Redirect URLs ────────────────────────────────────────────────────────────
//
// Add both to:
//   Supabase Dashboard → Authentication → URL Configuration → Redirect URLs

export const AUTH_REDIRECT_URLS = {
  confirm:       (origin: string) => `${origin}/auth/confirm`,
  resetPassword: (origin: string) => `${origin}/auth/callback`,
} as const;

// ─── Shared styles ────────────────────────────────────────────────────────────

const BUTTON_STYLE = `
  display:inline-block;
  background:#f43f5e;
  color:#ffffff;
  font-size:15px;
  font-weight:700;
  text-decoration:none;
  padding:16px 40px;
  border-radius:50px;
`.replace(/\s+/g, " ").trim();

const WRAPPER_STYLE = `
  margin:0;
  padding:0;
  background:#f9fafb;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
`.replace(/\s+/g, " ").trim();

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

  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Confirm your Chat254 account</title>
  </head>
  <body style="${WRAPPER_STYLE}">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:480px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f3f4f6;">

            <tr>
              <td style="background:linear-gradient(135deg,#f43f5e,#fb7185);padding:40px 40px 32px;text-align:center;">
                <div style="font-size:36px;margin-bottom:8px;">❤️</div>
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                  Welcome to Chat254
                </h1>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
                  You're almost in, ${firstName}!
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:36px 40px;">
                <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                  Thanks for joining Kenya's #1 dating app. Click below to confirm
                  your email and activate your account.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:8px 0 24px;">
                      <a href="${confirmationUrl}" style="${BUTTON_STYLE}">
                        Confirm My Account →
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                  This link expires in <strong>24 hours</strong>. If you didn't
                  create a Chat254 account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 40px 32px;text-align:center;">
                <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;" />
                <p style="margin:0;color:#9ca3af;font-size:12px;">Chat254 · Nairobi, Kenya</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from:    FROM,
      to:      email,
      subject: "Confirm your Chat254 account ❤️",
      html,
    });

    if (error) {
      console.error("[mail/sendConfirmationEmail] resend error:", error);
      return { error: new Error(error.message) };
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
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Reset your Chat254 password</title>
  </head>
  <body style="${WRAPPER_STYLE}">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:480px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f3f4f6;">

            <tr>
              <td style="background:linear-gradient(135deg,#f43f5e,#fb7185);padding:40px 40px 32px;text-align:center;">
                <div style="font-size:36px;margin-bottom:8px;">🔐</div>
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;">
                  Reset your password
                </h1>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
                  We received a reset request for your account
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:36px 40px;">
                <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                  Click the button below to set a new password. This link expires
                  in <strong>1 hour</strong>.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:8px 0 24px;">
                      <a href="${resetUrl}" style="${BUTTON_STYLE}">
                        Reset My Password →
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                  If you didn't request a password reset, you can safely ignore
                  this email. Your password will not change.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 40px 32px;text-align:center;">
                <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;" />
                <p style="margin:0;color:#9ca3af;font-size:12px;">Chat254 · Nairobi, Kenya</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from:    FROM,
      to:      email,
      subject: "Reset your Chat254 password 🔐",
      html,
    });

    if (error) {
      console.error("[mail/sendPasswordResetEmail] resend error:", error);
      return { error: new Error(error.message) };
    }

    return { error: null };
  } catch (err) {
    console.error("[mail/sendPasswordResetEmail] unexpected error:", err);
    return { error: err instanceof Error ? err : new Error(String(err)) };
  }
}