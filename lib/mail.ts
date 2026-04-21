// lib/mail.ts
//
// Single source of truth for all transactional emails.
// Every email sent by the app goes through this file.
// Uses Supabase's built-in email system (via Resend SMTP configured in
// the dashboard) — we don't call Resend directly from code. Supabase
// handles token generation, secure storage, expiry, and rate limiting.
//
// If you ever need to send custom emails outside of auth flows (e.g.
// marketing, notifications), add a Resend client here and export helpers.
//
// ─── Email template constants ─────────────────────────────────────────────────
//
// These are configured in:
//   Supabase Dashboard → Authentication → Email Templates
//
// Copy these HTML templates into the dashboard. The {{ .ConfirmationURL }}
// and {{ .Token }} variables are injected by Supabase at send time.

export const EMAIL_TEMPLATES = {
  confirmation: {
    subject: "Confirm your Chat254 account ❤️",
    // Paste into: Auth → Email Templates → Confirm signup
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirm your account</title>
  </head>
  <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:480px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f3f4f6;">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#f43f5e,#fb7185);padding:40px 40px 32px;text-align:center;">
                <div style="font-size:36px;margin-bottom:8px;">❤️</div>
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                  Welcome to Chat254
                </h1>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
                  You're almost in!
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px;">
                <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                  Thanks for joining Kenya's #1 dating app. Click the button below to confirm your email and activate your account.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:8px 0 24px;">
                      <a
                        href="{{ .ConfirmationURL }}"
                        style="display:inline-block;background:#f43f5e;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:50px;"
                      >
                        Confirm My Account →
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                  This link expires in <strong>24 hours</strong>. If you didn't create a Chat254 account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:0 40px 32px;text-align:center;">
                <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;" />
                <p style="margin:0;color:#9ca3af;font-size:12px;">
                  Chat254 · Nairobi, Kenya
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `.trim(),
  },

  passwordReset: {
    subject: "Reset your Chat254 password 🔐",
    // Paste into: Auth → Email Templates → Reset password
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset your password</title>
  </head>
  <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:480px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f3f4f6;">

            <!-- Header -->
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

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px;">
                <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                  Click the button below to set a new password. This link expires in <strong>1 hour</strong>.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:8px 0 24px;">
                      <a
                        href="{{ .ConfirmationURL }}"
                        style="display:inline-block;background:#f43f5e;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:50px;"
                      >
                        Reset My Password →
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
                  If you didn't request a password reset, you can safely ignore this email. Your password will not change.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:0 40px 32px;text-align:center;">
                <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;" />
                <p style="margin:0;color:#9ca3af;font-size:12px;">
                  Chat254 · Nairobi, Kenya
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `.trim(),
  },
} as const;

// ─── Redirect URLs ────────────────────────────────────────────────────────────
//
// These must also be added to:
//   Supabase Dashboard → Authentication → URL Configuration → Redirect URLs

export const AUTH_REDIRECT_URLS = {
  // Email confirmation (signup)
  confirm: (origin: string) => `${origin}/auth/confirm`,
  // Password reset callback
  resetPassword: (origin: string) => `${origin}/auth/callback`,
} as const;