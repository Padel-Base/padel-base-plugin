# AGENTS.md

Padel-Base plugin for Claude and ChatGPT/Codex: the remote MCP server
`https://api.padel-base.fr/functions/v1/mcp-server/mcp` (source:
`Padel-Base/supabase-backend`, `supabase/functions/mcp-server/`) plus skills
that present its results. See [README.md](README.md) for layout and install.

## Commands

```bash
npm run validate           # the CI gate (no dependencies, Node 22)
npm run validate:live      # also probes the MCP endpoint
claude plugin validate . && claude plugin validate plugins/padel-base
npm run package:openai     # ZIP for the OpenAI plugin directory
```

No `npm install`: there are no dependencies.

## Rules

- Two manifests per plugin, kept in step: `.claude-plugin/plugin.json` +
  `.mcp.json` (Claude, `type: "http"`) and `plugin.json` + `mcp.json` (OpenAI
  Agent Plugins, `type: "streamable-http"`). Same name, version, description,
  server name and URL. OpenAI allows one MCP server per plugin.
- Both marketplaces (`.claude-plugin/marketplace.json`,
  `.agents/plugins/marketplace.json`) list the same plugins at the same paths.
- One skill, `padel-base`, shared by both hosts: `SKILL.md` holds the common
  rules, `references/` the detail per subject. Frontmatter is `name` +
  `description` only; `name` equals the directory.
- The skill is written in French, to the model ("tu"); answers to players use
  "vous" unless the player says "tu". Keep it provider-neutral: no "Claude" or
  "ChatGPT" in skill text.
- The skill follows the server: tools and statuses come from
  `supabase-backend`, `supabase/functions/_shared/mcp/` (`tools.ts`,
  `outcome.ts`, `handlers.ts`). `TOOLS` in `scripts/validate.mjs` mirrors the
  registered tools. When a tool, a status or an answer's shape changes there,
  change the skill here.
- Never promise what no tool returns (court names, a number of free courts, a
  WhatsApp share or group link, a player's first name). Never hardcode a booking
  or registration URL outside an example: links come from tool results.
- The server never books. The skill must not suggest otherwise.
- Directory rules (both stores): the skill must not tell the model to hide what
  the plugin does or where data comes from when the player asks, to override
  other instructions, or to steer away from other plugins. Everything the plugin
  sends, stores or fetches is disclosed in `plugins/padel-base/README.md`: keep
  it true.
- The plugin folder is what users install and what the stores scan: plugin
  files only, a README, a LICENSE, no `CLAUDE.md`, no hooks, no secrets.
