# padel-base-plugin

The Padel Base plugin for **Claude** (Claude Code, Claude Desktop, claude.ai)
and **ChatGPT / Codex**. One plugin, two manifests:

- the **MCP server** served at
  `https://api.padel-base.fr/functions/v1/mcp-server/mcp`, does the work: club
  search, live courts, open matches, tournaments, the player's level and
  availabilities;
- one **skill** is the presentation layer: which tool to call, how to read its
  answer, and how to turn it into a short French answer with the right link.

What the plugin does for players:
[plugins/padel-base/README.md](plugins/padel-base/README.md).

## Layout

```
.claude-plugin/marketplace.json     Claude marketplace (this repo)
.agents/plugins/marketplace.json    OpenAI marketplace (this repo)
plugins/padel-base/
  .claude-plugin/plugin.json        Claude manifest
  .mcp.json                         Claude MCP config      (type "http")
  plugin.json                       OpenAI manifest (Agent Plugins format)
  mcp.json                          OpenAI MCP config      (type "streamable-http", OAuth/DCR)
  skills/padel-base/                shared by both hosts: SKILL.md + references/
  README.md, LICENSE, NOTICE        required by both directories
  assets/                           logo and composer icon
scripts/validate.mjs                cross-host checks, run in CI
```

Each host reads only its own files, and both read `skills/`. The two manifests
and the two MCP files must describe the same plugin and the same server;
`scripts/validate.mjs` fails when they drift.

## Install

### Claude Code

```
/plugin install padel-base --marketplace Padel-Base/padel-base-plugin
```

or, from a shell (older versions too):

```bash
claude plugin marketplace add Padel-Base/padel-base-plugin
claude plugin install padel-base@padel-base
```

Then `/mcp` → `padel-base` → authenticate. For local development, load the
folder directly: `claude --plugin-dir ./plugins/padel-base`.

### Claude Desktop / claude.ai

Add the marketplace in the plugin settings (the GitHub repo
`Padel-Base/padel-base-plugin`), or add the MCP URL alone as a custom connector.
The connector gives the tools without the skills.

### Codex / ChatGPT desktop

```bash
codex plugin marketplace add Padel-Base/padel-base-plugin
```

then install `padel-base` from the plugin list. Sign-in runs on install.

## Publish to the directories

What is still open today: [SUBMISSION-BLOCKERS.md](SUBMISSION-BLOCKERS.md).

`npm run validate` checks what can be checked from the files, and lists as
warnings what a submission still needs. What it cannot check:

**Both stores**

- The MCP server must be live at the URL in `.mcp.json` / `mcp.json`.
- Every tool needs `readOnlyHint`, `destructiveHint` and `openWorldHint` as
  explicit booleans (OpenAI) and a `title` (Claude). Set in `supabase-backend`,
  `_shared/mcp/tools.ts`.
- A support page on an https URL (`supportUrl` / `supportURL`), and a privacy
  policy that covers what the README's "What the plugin sends, stores and
  fetches" section lists.
- A reviewer test account with sample data that signs in without an email code.

**Claude** ([submit](https://claude.com/docs/plugins/submit),
[checklist](https://claude.com/docs/plugins/pre-submission-checklist))

- Submit in the developer portal (claude.ai/directory/manage → Submit new →
  Plugin bundle): repository `Padel-Base/padel-base-plugin`, plugin path
  `plugins/padel-base`. The repository must be public when the listing goes
  live.
- Submit the MCP server as its own connector too
  ([review criteria](https://claude.com/docs/connectors/building/review-criteria)).
- The Verified label has no application: Anthropic decides during review.

**ChatGPT / Codex**
([submit](https://developers.openai.com/codex/submit-plugins),
[guidelines](https://developers.openai.com/plugins/plugin-guidelines))

```bash
npm run package:openai   # → padel-base-openai.zip (OpenAI files only)
```

- Upload the ZIP through **With MCP**, with a verified developer identity.
- Serve the domain verification token at
  `https://api.padel-base.fr/.well-known/openai-apps-challenge`.
- Add `review.demo_recording_url` (a video walkthrough) to `plugin.json`. The
  five positive and three negative test cases are already there: run each
  against the test account first.

## Develop

```bash
npm run validate                         # manifests, MCP configs, skills
npm run validate:live                    # + probe the MCP endpoint's OAuth
claude plugin validate .                 # Claude's own checks (marketplace)
claude plugin validate plugins/padel-base
claude --plugin-dir ./plugins/padel-base plugin details padel-base
```

When the backend changes:

- **A tool is added, renamed or removed** in `_shared/mcp/tools.ts`: update
  `TOOLS` in `scripts/validate.mjs`, then the skill and the tool list in the
  plugin README. Validation fails on a skill naming a tool that does not exist.
- **A result's shape or a status changes** (`handlers.ts`, `outcome.ts`): update
  the skill, which quotes statuses and a few field names (`app_link`,
  `results`, `nearby`, …).
- **The MCP URL changes**: change it in both `.mcp.json` and `mcp.json`.

Bump `version` in **both** manifests on each release; validation checks they
match.

## Writing the skill

- One skill, `padel-base`. `SKILL.md` holds the rules every answer follows and
  stays under 500 lines; each subject has its file in `references/`, opened only
  when needed.
- Frontmatter: only `name` (= directory name) and `description` (≤ 1024
  characters), so the same file works in Claude Code, claude.ai and OpenAI. The
  description decides when the skill loads: say what it is for and the words
  players use.
- Written in French, provider-neutral. It describes what the server returns
  today: when a tool or a status changes in `supabase-backend`, change the skill
  with it.
- Real URLs appear only in examples; in an answer, links come from tool results.

## License

[Apache-2.0](LICENSE). Copyright 2026 PADEL BASE. The Padel Base name and logo
are trademarks of PADEL BASE and are not covered by the license: see
[NOTICE](NOTICE).
