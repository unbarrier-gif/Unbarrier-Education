import type { Copy } from '@/lib/kit';

// One piece of /inclusive-mainstream copy, as plain text: the words in
// lib/kit.ts, or the slot's placeholder where none are written yet. No
// styling of its own — a slot reads like any other text on the page.
export function Slot({ copy }: { copy: Copy }) {
  return <>{copy.text ?? copy.placeholder}</>;
}
