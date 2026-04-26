const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers';

type Result = { ok: true } | { ok: false; status: number; error: string };

export async function addSubscriber(email: string): Promise<Result> {
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
        status: 'active',
      }),
      cache: 'no-store',
    });

    // 422 = already subscribed. Treat as success — don't leak state.
    if (res.ok || res.status === 422) {
      return { ok: true };
    }
    return { ok: false, status: res.status, error: `mailerlite-${res.status}` };
  } catch (e) {
    return { ok: false, status: 0, error: 'mailerlite-network' };
  }
}
