# padel-base-plugin

The Padel-Base plugin for **Claude** (Claude Code, Claude Desktop, claude.ai)
and **ChatGPT / Codex**. One plugin, two manifests:

- the **MCP server** `mcp-server` from
  [supabase-backend](https://github.com/Padel-Base/supabase-backend)
  (`supabase/functions/mcp-server/`), served at
  `https://api.padel-base.fr/functions/v1/mcp-server`, does the work: live
  courts, open matches, tournaments, the player's level and availabilities;
- **skills** are the presentation layer: which tool to call, and how to turn its
  JSON into a short French answer with the right booking link.

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
  skills/<name>/SKILL.md            shared by both hosts
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

For the public ChatGPT/Codex plugin directory, build the ZIP and upload it on
the platform.openai.com Plugins page:

```bash
npm run package:openai   # → padel-base-openai.zip (OpenAI files only)
```

Submission also needs a verified developer identity, a support URL, test cases
and a video walkthrough. See OpenAI's submission guide.

## Develop

```bash
npm run validate                         # manifests, MCP configs, skills
npm run validate:live                    # + probe the MCP endpoint's OAuth
claude plugin validate .                 # Claude's own checks (marketplace)
claude plugin validate plugins/padel-base
claude --plugin-dir ./plugins/padel-base plugin details padel-base
```

When the backend changes:

- **A tool is added, renamed or removed** in `mcp-server/tools.ts`: update
  `TOOLS` in `scripts/validate.mjs`, then the skills that should use it.
  Validation fails on a skill naming a tool that does not exist.
- **A result's shape changes** (`handlers.ts`): update the skill that presents
  it. Skills quote field names (`app_link`, `players_needed`, `status`, …).
- **The MCP URL changes**: change it in both `.mcp.json` and `mcp.json`.

Bump `version` in **both** manifests on each release; validation checks they
match.

## Writing skills

- One skill per kind of answer. Shared rules live in `padel-base`, and the
  glossary in `skills/padel-base/references/`.
- Frontmatter: only `name` (= directory name) and `description`, so the same
  file works in Claude Code, claude.ai and OpenAI. The description decides when
  a skill loads: say what it is for and the words players use.
- Instructions in English. Examples of output in French, informal "tu", as the
  WhatsApp bot speaks.
- Never put a real URL in an example: links come only from tool results.
