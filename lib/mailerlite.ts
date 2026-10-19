const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers';

type Result = { ok: true } | { ok: false; status: number; error: string };

/**
 * The consent record written alongside the address. Required — there is no
 * overload that subscribes without one, on purpose: a caller that cannot
 * describe the consent it collected has not collected any.
 */
export type ConsentRecord = {
  /** Exact wording shown on screen. Comes from CONSENT_WORDING. */
  wording: string;
  /** Which form collected it, e.g. "subscribe block". */
  source: string;
  /** Requester IP at the moment of consent. "unknown" is acceptable. */
  ip: string;
};

/**
 * MailerLite date custom fields take `YYYY-MM-DD HH:MM:SS`. UTC, so records
 * from different deploy regions are comparable.
 */
function consentTimestamp(now: Date): string {
  return now.toISOString().slice(0, 19).replace('T', ' ');
}

export async function addSubscriber(
  email: string,
  consent: ConsentRecord,
): Promise<Result> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    return { ok: false, status: 500, error: 'mailerlite-config-missing' };
  }

  try {
    const res = await fetch(MAILERLITE_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        // 'unconfirmed', not 'active'. MailerLite sends its confirmation email
        // and the subscriber only becomes active once they click it. Double
        // opt-in is not required in the UK, but it produces dated third-party
        // proof of consent, which is what answers a complaint.
        //
        // NOTE: this is the API half only. The group itself may also need
        // double opt-in switching on in the MailerLite dashboard — deliberately
        // not changed here, and flagged for Nici.
        status: 'unconfirmed',
        // The four consent fields already exist on the account. Exact keys —
        // do not rename, do not create new ones. The endpoint upserts on
        // email, so someone re-subscribing has their consent record updated
        // in place rather than duplicated.
        fields: {
          consent_date: consentTimestamp(new Date()),
          consent_wording: consent.wording,
          consent_source: consent.source,
          consent_ip: consent.ip,
        },
      }),
      cache: 'no-store',
    });

    // 422 = already subscribed. Treated as success so the form cannot be used
    // to discover whether an address is on the list.
    if (res.ok || res.status === 422) {
      return { ok: true };
    }
    return { ok: false, status: res.status, error: `mailerlite-${res.status}` };
  } catch {
    return { ok: false, status: 0, error: 'mailerlite-network' };
  }
}
