// design-sync host adapter for `react-dom`. Next 14 ships a canary React
// whose react-dom exports useFormState/useFormStatus; a stable React 18 host
// does not. The bundle resolves react-dom to the page's window.ReactDOM, so
// this module hands through the real hooks when the host has them and
// otherwise polyfills them with plain state: the form renders its idle state
// and a submit resolves the (inert) action into the next state.
import { useCallback, useState } from 'react';

type AnyReactDom = Record<string, unknown> & {
  useFormState?: unknown;
  useFormStatus?: unknown;
};

const host: AnyReactDom =
  (typeof window !== 'undefined' && (window as unknown as { ReactDOM?: AnyReactDom }).ReactDOM) || {};

function polyfillUseFormState<State>(
  action: (state: State, payload: FormData) => State | Promise<State>,
  initialState: State,
  _permalink?: string,
): [State, (payload: FormData) => void] {
  const [state, setState] = useState<State>(initialState);
  const dispatch = useCallback(
    (payload: FormData) => {
      Promise.resolve(action(state, payload)).then(setState);
    },
    [action, state],
  );
  return [state, dispatch];
}

function polyfillUseFormStatus() {
  return { pending: false, data: null, method: null, action: null };
}

export const useFormState = (host.useFormState ?? polyfillUseFormState) as typeof polyfillUseFormState;
export const useFormStatus = (host.useFormStatus ?? polyfillUseFormStatus) as typeof polyfillUseFormStatus;

export default host;
