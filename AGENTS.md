# AGENTS.md

Padel-Base plugin for Claude and ChatGPT/Codex: the remote MCP server
`https://api.padel-base.fr/functions/v1/mcp-server` (source:
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
- Skills are shared by both hosts. Frontmatter is `name` + `description` only;
  `name` equals the directory.
- Skills name only tools the server registers (`TOOLS` in
  `scripts/validate.mjs`, mirrored from `mcp-server/tools.ts`). Change both
  together.
- Instructions in English; example answers in French, "tu". Never hardcode a
  booking or registration URL: they come from tool results.
- The server is read-mostly and never books. Skills must not suggest otherwise.
