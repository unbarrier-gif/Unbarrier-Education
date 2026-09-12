import { ReadingControls } from 'unbarrier-education';

// The listen button only renders where speech synthesis exists; a headless
// capture has none, so the bar shows the size and spacing controls only.

/** The blog post's bar: text size A− / A+, extra spacing, listen (where the browser can speak), and the saved-on-this-device note. */
export const Default = () => (
  <div style={{ maxWidth: 640 }}>
    <div id="post-body" hidden>
      nobody audits whether the tech reached the child.
    </div>
    <ReadingControls />
  </div>
);

/** minimal: the size and spacing controls hidden, leaving just listen and the note. */
export const Minimal = () => (
  <div style={{ maxWidth: 640 }}>
    <div id="post-body" hidden>
      nobody audits whether the tech reached the child.
    </div>
    <ReadingControls minimal />
  </div>
);
