# Claude Code on Mac — local setup

Workflow notes for running Claude Code (the CLI) against this repo on macOS. Useful first read when you (or a teammate) clone this repo for the first time.

## Install & auth

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Native installer; auto-updates in the background.

Alternative: `brew install --cask claude-code` &mdash; works but you'll need `brew upgrade claude-code` manually.

First run of `claude` opens a browser to authenticate. Use the same Anthropic / Claude.ai account that's signed in to web Claude Code.

## Start a session in the right folder

```bash
cd ~/Documents/Unbarrier-Education
claude
```

**Always `cd` first.** Sessions are scoped per-directory — file context, MCP scope, and history all key off the working directory.

## Project memory — `CLAUDE.md`

In your first session inside the repo, run:

```
/init
```

It scans the codebase and generates a starter `CLAUDE.md` at the repo root. Commit it — it's shared context for future you, future Claude, and any teammate. Every subsequent session reads it automatically.

## Continuing across sessions

| Command | What it does |
| --- | --- |
| `claude --continue` (or `-c`) | Resumes the most recent session in this directory immediately. No picker. |
| `claude --resume` (or `-r`) | Opens an interactive picker of past sessions. Use this when you've got multiple threads. |
| `claude --resume <id>` | Jump straight to a specific session by ID. |

After lunch: `claude -c`. Coming back to a parked thread amongst several: `claude -r`.

## Settings file — `~/.claude/settings.json`

Pre-approve commands you run constantly so you don't get a permission prompt every time:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run dev)",
      "Bash(npm run build)",
      "Bash(npm run lint)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ]
  }
}
```

Easier path: run this skill inside a session and Claude will scan your transcripts and propose a tailored allow-list:

```
/fewer-permission-prompts
```

## The one thing not to skip — Plan mode

**Shift+Tab toggles Plan mode.** Or launch with `--permission-mode plan`.

In Plan mode, Claude can only read files and edit a single plan file. It can't write code, install packages, or push commits until you approve the plan. Get into the habit of toggling it on for anything more than a one-line fix — every change is visible before anything happens. Critical for things shipping behind a printed QR.

## GitHub MCP

The same `unbarrier-gif/Unbarrier-Education` GitHub scope used in web Claude Code is available in local Claude Code. You can ask things like "what's the status of PR #2" or "show me the latest comment on PR #1" without leaving the terminal.

## First-session warm-up after cloning

```bash
cd ~/Documents/Unbarrier-Education
git fetch origin feat/hello feat/phase-2/foundation
git switch feat/hello
cp .env.example .env.local
# paste real MAILERLITE_API_KEY + RESEND_API_KEY into .env.local
npm install
claude
```

Then in the session:

```
/init
/fewer-permission-prompts
```

Commit `CLAUDE.md`, and you're set.

## `.env.local` — what to fill in

`.env.example` lists every variable. The non-public ones (the ones without `NEXT_PUBLIC_` prefix) need real values pasted from Vercel project Settings &rarr; Environment Variables:

- `MAILERLITE_API_KEY` &mdash; newsletter signup will silently fail without it
- `RESEND_API_KEY` &mdash; say-hi forward will fail without it
- `MAILERLITE_GROUP_ID` &mdash; already public-known: `185831469000688733`
- `SAY_HI_FORWARD_TO` &mdash; `hello@unbarrier.me`

Public vars (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) have hard-coded fallbacks in the code, so they work without `.env.local`. (`NEXT_PUBLIC_TIDYCAL_*` no longer exists — TidyCal was retired 21 Aug 2026 and `lib/tidycal.ts` was deleted; nothing reads those vars now.)

## ISP audit tool (`/isp-audit`) — one-time setup

Two manual steps in the Vercel dashboard before this route works anywhere (local or deployed):

1. **Provision Postgres** — project → Storage tab → Create Database → Postgres (Neon-backed). This auto-populates `DATABASE_URL` in Production + Preview. For local dev, run `vercel env pull .env.local` (or copy the value manually from Settings → Environment Variables).
2. **Set `ISP_AUDIT_ADMIN_KEY`** — any long random string, in Production + Preview. This is the passcode for `/isp-audit/dashboard` (Nici-only aggregate view + CSV export) — no separate login system, just this one shared value.

Nothing else to run — the table (`isp_audit_responses`) is created automatically on first request.

## Useful slash commands at a glance

| Command | Purpose |
| --- | --- |
| `/init` | Generate `CLAUDE.md` from the codebase |
| `/fewer-permission-prompts` | Auto-build an allow-list for common reads |
| `/review` | Multi-agent code review of pending changes |
| `/security-review` | Security review of the pending changes |
| `/agents` | List + manage subagents |
| `/mcp` | Manage MCP servers (add Notion here if you want) |
| Shift+Tab | Toggle Plan mode |
| `/help` | All the rest |

## Adding Notion access (optional)

Once you're in local Claude Code, run `/mcp` and add the Notion MCP server. After that, future sessions can read and write Notion pages directly &mdash; including workflow notes like this one. Worth doing if you keep a journal.
