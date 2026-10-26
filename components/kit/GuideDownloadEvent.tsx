'use client';

import { useEffect } from 'react';
import { HUBSPOT } from '@/lib/kit';

// Counts one `guide_download` in Plausible each time amber's HubSpot form is
// submitted. The embed posts a window message when a submission succeeds
// (`hsFormCallback` / `onFormSubmitted`); we listen for that and fire the
// custom event, the same way SayHiForm and NewsletterBand do. Nothing about
// the person is sent - Plausible only ever sees the event name.
//
// Reach lives in Plausible, people live in HubSpot. See the kit data plan.
export function GuideDownloadEvent() {
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      const isHubspot =
        data.type === 'hsFormCallback' && data.eventName === 'onFormSubmitted';
      if (!isHubspot) return;
      // the embed sends the form id back; ignore any other form on the page
      if (data.id && data.id !== HUBSPOT.formId) return;
      if (typeof window.plausible === 'function') {
        window.plausible('guide_download');
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return null;
}
