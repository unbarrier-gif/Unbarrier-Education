import Script from 'next/script';
import { HUBSPOT } from '@/lib/kit';
import { GuideDownloadEvent } from './GuideDownloadEvent';

// amber's HubSpot form (embed v4, EU1). The script finds every
// `.hs-form-frame` on the page and renders the form into it; the fields
// (name, school, role, email, the unticked notice box) are set in HubSpot, so
// there is nothing to build or validate here. No partner-consent box.
//
// `afterInteractive` loads it once the page is hydrated, so React has finished
// with the div before HubSpot writes into it. The sandbox that builds this
// cannot reach hsforms.net, so the embed itself is checked on the Vercel
// preview, not here.
//
// A client-side navigation INTO /inclusive-mainstream would not re-run an already-loaded
// script, so nothing on the site links here with next/link. Keep it that way
// or add a re-scan.
export function HubspotForm() {
  return (
    <>
      <Script src={HUBSPOT.scriptSrc} strategy="afterInteractive" />
      <GuideDownloadEvent />
      <div
        className="hs-form-frame"
        data-region={HUBSPOT.region}
        data-form-id={HUBSPOT.formId}
        data-portal-id={HUBSPOT.portalId}
      />
    </>
  );
}
