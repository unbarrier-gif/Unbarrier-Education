#!/usr/bin/env python3
"""One-off transform: a printable .dc.html prototype → a standalone print
source (no design-canvas runtime). Used once on 13 Sep 2026 to create the
two sources in this folder; kept so the step is repeatable if a prototype is
re-issued. Usage: transform.py <in.dc.html> <out.html> <title>"""
import re, sys, html

src, out, title = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(src, encoding='utf-8').read()

body = s[s.index('<doc-page'):s.index('</doc-page>')]
body = re.sub(r'<doc-page[^>]*>', '', body)

# sc-if: keep the block when the prop's DEFAULT (from the data-props json on
# the logic script) is true — showEdgeRule / showConsents on, showQr off.
import json
props_json = html.unescape(re.search(r'data-props="([^"]*)"', s).group(1))
DEFAULTS = {k: v.get('default') for k, v in json.loads(props_json).items()}
def sc_if(m):
    prop = re.search(r'value="\{\{ (\w+) \}\}"', m.group(1)).group(1)
    return m.group(2) if DEFAULTS.get(prop) is True else ''
body = re.sub(r'<sc-if([^>]*)>(.*?)</sc-if>', sc_if, body, flags=re.S)

body = body.replace('{{ bookingUrl }}', 'unbarrier.me/book')

# The seven questions (voice baseline only): expand the sc-for with the 1 Sep set.
QUESTIONS = [
  ('provision', 'is there a device, a tool, a connection at all — and is it in the room, charged and working when the lesson starts?', 'does the thing exist for this child, or only on the inventory?',
   ['M12 2 2 7l10 5 10-5-10-5Z','m2 17 10 5 10-5','m2 12 10 5 10-5']),
  ('access', 'can the child get into it without an adult beside them — the settings, the login, the support features?', 'does it work for them, not just work?',
   ['M7.5 15.5m-4.5 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0-9 0','m10.7 12.3 8.3-8.3','m16 7 3 3','m13 10 3 3']),
  ('design', 'was the material built with more than one way in, before anyone had to ask for an adjustment?', 'universal design, and the only lever left where the law cannot reach.',
   ['M12 5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0','M11 7.5 5 21','M13 7.5 19 21','M8.6 16h6.8']),
  ('capability', 'can the adults set it up on a tuesday, and does it hold across teachers, subjects and buildings when the champion is away?', 'is this practice, or is it one person?',
   ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z']),
  ('belonging', 'does the child want to be there, take part without being asked, and get back in when something goes wrong?', 'access without belonging is attendance.',
   ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2','M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0','M22 21v-2a4 4 0 0 0-3-3.9','M16 3.1a4 4 0 0 1 0 7.8']),
  ('trust', 'do the child, the family and the staff believe it will work when it matters — and believe their data is safe?', 'a tool that fails twice in front of a class is never opened again, whatever the audit says.',
   ['M20 13c0 5-3.5 7.5-7.7 8.9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1 1 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z','m9 12 2 2 4-4']),
  ('evidence', 'can you show a parent, a governor or an inspector what actually changed, without reaching for the word “engagement”?', 'if it cannot be shown, it cannot be funded, defended, or done again.',
   ['M3 3v16a2 2 0 0 0 2 2h16','m19 9-5 5-4-4-3 3']),
]
def cap(t): return t[0].upper() + t[1:]
def sentence(t): return re.sub(r'\btuesday\b', 'Tuesday', cap(t))

def sc_for(m):
    tpl = m.group(2)
    rows = []
    for i, (term, q, note, paths) in enumerate(QUESTIONS):
        icon = ('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#210a33" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">'
                + ''.join(f'<path d="{d}"></path>' for d in paths) + '</svg>')
        r = tpl.replace('{{ q.icon }}', icon).replace('{{ q.num }}', f'{i+1:02d}')
        r = r.replace('{{ q.term }}', cap(term)).replace('{{ q.question }}', sentence(q)).replace('{{ q.note }}', sentence(note))
        rows.append(r)
    return ''.join(rows)
body = re.sub(r'<sc-for[^>]*>(\s*)(.*?)</sc-for>', lambda m: sc_for(m), body, flags=re.S)

assert '{{' not in body, re.findall(r'{{[^}]*}}', body)[:5]

head = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{html.escape(title)}</title>
<link rel="stylesheet" href="fonts/fonts.css">
<style>
  @page {{ size: A4; margin: 0; }}
  html, body {{ margin: 0; padding: 0; background: #fff; }}
  body {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
  .page {{ width: 210mm; height: 297mm; box-sizing: border-box; overflow: hidden; page-break-after: always; break-after: page; }}
  .page:last-child {{ page-break-after: auto; break-after: auto; }}
  p, h1, h2 {{ text-wrap: pretty; }}
  /* the page footer: 2mm less than the prototype's 9mm, so the densest page (discovery day, 4 of 4) fits A4 exactly */
  .page > :last-child {{ padding-bottom: 7mm !important; }}
</style>
</head>
<body>
'''
open(out, 'w', encoding='utf-8').write(head + body.strip() + '\n</body>\n</html>\n')
print('wrote', out)
