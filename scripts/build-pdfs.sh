#!/usr/bin/env sh
# Renders the printable documents in docs/print/ to the pdfs served from
# public/. Headless Chromium, no npm dependency: the fonts come from Google
# Fonts at render time, so run it with network access.
#
#   CHROME=/path/to/chrome scripts/build-pdfs.sh
#
# CHROME defaults to the Playwright Chromium this repo's cloud sessions carry.
# Commit the pdfs: the urls (lib/documents.ts) never change, so nothing
# linked or printed needs updating when a document is re-issued.
set -eu
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
render() {
  "$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
    --run-all-compositor-stages-before-draw --virtual-time-budget=8000 \
    --no-pdf-header-footer --print-to-pdf="public/$2" "file://$(pwd)/docs/print/$1" 2>/dev/null
  echo "wrote public/$2"
}
render discovery-day.html discovery-day.pdf
render voice-baseline.html voice-baseline.pdf
