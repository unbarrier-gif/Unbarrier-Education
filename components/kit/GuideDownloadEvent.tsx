'use client';

import { useEffect } from 'react';
import { HUBSPOT } from '@/lib/kit';

// Counts one `guide_download` in Plausible each time amber's HubSpot form is
// submitted. Nothing about the person is sent - Plausible only ever sees the
// event name. Reach lives in Plausible, people live in HubSpot. See the kit
// data plan.
//
// The v4 embed (forms/embed/<portal>.js) does NOT post the legacy
// `hsFormCallback` / `onFormSubmitted` window message - that is the v2 embed.
// It dispatches DOM CustomEvents on `window` instead, and the one we want is
// `hs-form-event:on-submission:success`, with the form id in `event.detail`.
// Confirmed 26 oct 2026 by reading the live embed script: it contains
// `hs-form-event:on-submission:success` and no `hsFormCallback`. The legacy
// listener is kept as a fallback in case HubSpot ever swaps the embed back.
const V4_SUCCESS = 'hs-form-event:on-submission:success';

function fire() {
  if (typeof window.plausible === 'function') {
    window.plausible('guide_download');
  }
}

function isOurForm(id: unknown) {
  return !id || id === HUBSPOT.formId;
}

export function GuideDownloadEvent() {
  useEffect(() => {
    function onV4(event: Event) {
      const detail = (event as CustomEvent<{ formId?: string }>).detail;
      if (!isOurForm(detail?.formId)) return;
      fire();
    }
    function onLegacyMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type !== 'hsFormCallback' || data.eventName !== 'onFormSubmitted') return;
      if (!isOurForm(data.id)) return;
      fire();
    }
    window.addEventListener(V4_SUCCESS, onV4);
    window.addEventListener('message', onLegacyMessage);
    return () => {
      window.removeEventListener(V4_SUCCESS, onV4);
      window.removeEventListener('message', onLegacyMessage);
    };
  }, []);

  return null;
}
