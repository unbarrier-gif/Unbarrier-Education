const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const FROM = 'Unbarrier <say-hi@unbarrier.me>';

type Result = { ok: true } | { ok: false; status: number; error: string };

export async function sendSayHi(
  fromEmail: string,
  message: string,
): Promise<Result> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SAY_HI_FORWARD_TO;

  if (!apiKey || !to) {
    return { ok: false, status: 500, error: 'resend-config-missing' };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: fromEmail,
        subject: `[say hi] ${fromEmail}`,
        text: `From: ${fromEmail}\n\n${message}`,
      }),
      cache: 'no-store',
    });

    if (res.ok) return { ok: true };
    return { ok: false, status: res.status, error: `resend-${res.status}` };
  } catch (e) {
    return { ok: false, status: 0, error: 'resend-network' };
  }
}

/**
 * Sends someone their own readiness-check result.
 *
 * THE ADDRESS IS USED HERE AND NOWHERE ELSE. It is not written to a database,
 * not added to a list, and not passed to MailerLite by this function. Someone
 * who wants their result and nothing else gives us their address for the
 * length of one send. If they ALSO ticked notice, that is a separate purpose
 * with its own consent record and its own code path — not this one.
 *
 * `lines` is the already-rendered result. Rendering happens at the call site
 * so this function holds no opinion about the instrument and cannot drift
 * away from what was shown on screen.
 */
export async function sendReadinessCheckResult(
  toEmail: string,
  lines: string,
): Promise<Result> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, status: 500, error: 'resend-config-missing' };

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [toEmail],
        subject: 'your readiness check',
        text: lines,
      }),
      cache: 'no-store',
    });
    if (res.ok) return { ok: true };
    return { ok: false, status: res.status, error: `resend-${res.status}` };
  } catch {
    return { ok: false, status: 0, error: 'resend-network' };
  }
}
