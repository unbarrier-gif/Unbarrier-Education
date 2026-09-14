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

/** What the /kit form collects alongside the address. */
export type KitSubscriber = {
  name: string;
  school: string;
  role: string;
  /** The scrubbed `?from=` slug, or "direct". */
  source: string;
};

/**
 * The /kit request: the guides go to this address, so the subscriber joins
 * the kit group (MAILERLITE_KIT_GROUP_ID — the automation that sends the
 * guides hangs off that group). Only if the notice box was ticked does the
 * address ALSO join the notice group, and only then are the consent fields
 * written: a request for the guides is not consent to marketing, and the
 * record must not claim one.
 *
 * `status` is 'unconfirmed' as on the subscribe block: MailerLite confirms
 * the address before anything goes out, which is also what proves the
 * address was theirs before we send the guides to it.
 *
 * FIELDS THAT MUST EXIST ON THE ACCOUNT: `name` and `company` are MailerLite
 * defaults; `kit_role` and `kit_source` are custom text fields that have to
 * be created in the MailerLite dashboard before /kit goes public. An unknown
 * field key comes back as a 422, which this path treats as the failure it
 * is (logged, and the person sees the retry message) — unlike the subscribe
 * block, where a 422 is the already-subscribed case.
 */
export async function addKitSubscriber(
  email: string,
  kit: KitSubscriber,
  consent: ConsentRecord | null,
): Promise<Result> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const kitGroupId = process.env.MAILERLITE_KIT_GROUP_ID;
  const noticeGroupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !kitGroupId || (consent && !noticeGroupId)) {
    return { ok: false, status: 500, error: 'mailerlite-config-missing' };
  }

  const groups = consent ? [kitGroupId, noticeGroupId!] : [kitGroupId];
  const fields: Record<string, string> = {
    name: kit.name,
    company: kit.school,
    kit_role: kit.role,
    kit_source: kit.source,
  };
  if (consent) {
    fields.consent_date = consentTimestamp(new Date());
    fields.consent_wording = consent.wording;
    fields.consent_source = consent.source;
    fields.consent_ip = consent.ip;
  }

  try {
    const res = await fetch(MAILERLITE_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, groups, status: 'unconfirmed', fields }),
      cache: 'no-store',
    });

    if (res.ok) return { ok: true };
    if (res.status === 422) {
      // Almost always a field key that does not exist on the account yet.
      // Say so in the server log, where the fix is; never to the person.
      console.error('[kit] mailerlite 422:', await res.text().catch(() => ''));
    }
    return { ok: false, status: res.status, error: `mailerlite-${res.status}` };
  } catch {
    return { ok: false, status: 0, error: 'mailerlite-network' };
  }
}
