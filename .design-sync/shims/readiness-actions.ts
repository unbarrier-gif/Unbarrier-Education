// design-sync host adapter for `@/app/readiness-check/actions`. The real
// module is a Next.js server action (database write, rate limiting) and cannot
// run in a browser bundle. The design build gets an inert action that resolves
// to the success state.
export type FinishState =
  | { status: 'idle' }
  | { status: 'ok'; contributed: boolean }
  | { status: 'error'; message: string };

export async function finishAction(_prev: FinishState, formData: FormData): Promise<FinishState> {
  await new Promise((r) => setTimeout(r, 400));
  return { status: 'ok', contributed: formData.get('contribute') === 'yes' };
}
