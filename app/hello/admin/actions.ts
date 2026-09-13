'use server';

import { revalidatePath } from 'next/cache';
import { isAdminAuthed } from '@/lib/isp-audit/adminAuth';
import { getTodayRows, setTodayHeading, setTodayOrder } from '@/lib/hello-links';

// The signed-in /hello screen's two edits. Both are gated on the same admin
// cookie the ISP dashboard uses (one passcode, Nici's), and both write to the
// Notion "hello links" table — the source of truth — then revalidate the
// public page so the room sees it within a minute.

export type EditState = { status: 'idle' } | { status: 'ok' } | { status: 'error'; message: string };

const NOT_WIRED =
  'notion isn’t answering, so this can’t be saved from here. edit the row in notion instead.';

export async function saveHeadingAction(
  _prev: EditState,
  formData: FormData,
): Promise<EditState> {
  if (!isAdminAuthed()) return { status: 'error', message: 'signed out.' };
  const heading = String(formData.get('heading') ?? '').trim();
  if (!heading) return { status: 'error', message: 'the heading can’t be empty.' };
  const ok = await setTodayHeading(heading);
  if (!ok) return { status: 'error', message: NOT_WIRED };
  revalidatePath('/hello');
  revalidatePath('/hello/admin');
  return { status: 'ok' };
}

export async function moveTodayAction(
  _prev: EditState,
  formData: FormData,
): Promise<EditState> {
  if (!isAdminAuthed()) return { status: 'error', message: 'signed out.' };
  const id = String(formData.get('id') ?? '');
  const direction = String(formData.get('direction') ?? '');
  const rows = await getTodayRows();
  if (!rows) return { status: 'error', message: NOT_WIRED };
  const i = rows.findIndex((r) => r.id === id);
  const j = direction === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= rows.length) return { status: 'idle' };
  const ids = rows.map((r) => r.id);
  [ids[i], ids[j]] = [ids[j], ids[i]];
  const ok = await setTodayOrder(ids);
  if (!ok) return { status: 'error', message: NOT_WIRED };
  revalidatePath('/hello');
  revalidatePath('/hello/admin');
  return { status: 'ok' };
}
