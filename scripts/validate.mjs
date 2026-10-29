#!/usr/bin/env node
// Checks what neither host validates for us: that the Claude and OpenAI
// manifests describe the same plugin, that both point at the same MCP server,
// that the OpenAI listing fits its limits, and that the skills are portable
// (frontmatter both hosts accept, links that resolve, tool names that exist).
//
//   node scripts/validate.mjs          static checks
//   node scripts/validate.mjs --live   also probe the MCP endpoint's OAuth
//
// No dependencies on purpose: CI runs it on a bare Node.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// The tools mcp-server registers (supabase-backend,
// supabase/functions/mcp-server/tools.ts). Skills may only name these.
const TOOLS = [
  "get_me",
  "set_level",
  "get_availabilities",
  "set_availabilities",
  "find_courts",
  "find_courts_for_me",
  "find_open_matches",
  "search_tournaments",
];

// Frontmatter keys accepted outside Claude Code (claude.ai, Skills API) and by
// OpenAI. Anything else would break one of the hosts.
const PORTABLE_KEYS = new Set([
  "name",
  "description",
  "license",
  "compatibility",
  "metadata",
  "allowed-tools",
]);

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);
const rel = (p) => relative(ROOT, p);

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(
      rel(path),
      e.code === "ENOENT" ? "missing" : `invalid JSON (${e.message})`,
    );
    return null;
  }
}

/** A `./`-relative path inside `base` that exists. */
function checkPath(where, base, p) {
  if (typeof p !== "string" || !p.startsWith("./") || p.includes("..")) {
    fail(where, `path ${JSON.stringify(p)} must start with ./ and stay inside`);
    return;
  }
  if (!existsSync(join(base, p))) fail(where, `${p} does not exist`);
}

function maxLen(where, value, max, required = true) {
  if (value === undefined) {
    if (required) fail(where, "missing");
    return;
  }
  if (typeof value !== "string" || value.trim() === "") {
    fail(where, "must be a non-empty string");
  } else if ([...value].length > max) {
    fail(where, `${[...value].length} characters, max ${max}`);
  }
}

// ── Marketplaces ──────────────────────────────────────────────────────────────

const claudeMarket = readJson(join(ROOT, ".claude-plugin/marketplace.json"));
const openaiMarket = readJson(join(ROOT, ".agents/plugins/marketplace.json"));

const pluginDirs = new Map(); // name → absolute dir
for (const entry of claudeMarket?.plugins ?? []) {
  const where = `.claude-plugin/marketplace.json ${entry.name}`;
  if (typeof entry.source !== "string") {
    fail(where, "source should be a ./ path in this repo");
    continue;
  }
  checkPath(where, ROOT, entry.source);
  pluginDirs.set(entry.name, join(ROOT, entry.source));
}
for (const entry of openaiMarket?.plugins ?? []) {
  const where = `.agents/plugins/marketplace.json ${entry.name}`;
  const path = typeof entry.source === "string"
    ? entry.source
    : entry.source?.path;
  checkPath(where, ROOT, path);
  if (pluginDirs.get(entry.name) !== join(ROOT, path ?? "")) {
    fail(
      where,
      "not listed at the same path in .claude-plugin/marketplace.json",
    );
  }
  if (!entry.policy?.installation || !entry.policy?.authentication) {
    fail(where, "policy.installation and policy.authentication are required");
  }
  if (!entry.category) fail(where, "category is required");
}
if (
  claudeMarket && openaiMarket &&
  claudeMarket.plugins.length !== openaiMarket.plugins.length
) {
  fail(
    "marketplaces",
    "the Claude and OpenAI marketplaces list different plugins",
  );
}

// ── Each plugin ───────────────────────────────────────────────────────────────

for (const [name, dir] of pluginDirs) {
  const at = (p) => `${rel(join(dir, p))}`;
  const claude = readJson(join(dir, ".claude-plugin/plugin.json"));
  const openai = readJson(join(dir, "plugin.json"));

  for (const [label, m] of [["claude", claude], ["openai", openai]]) {
    if (!m) continue;
    if (m.name !== name) {
      fail(`${label} manifest`, `name ${m.name} ≠ marketplace entry ${name}`);
    }
    if (!NAME_RE.test(m.name ?? "") || m.name.length > 64) {
      fail(`${label} manifest`, "name must be kebab-case, ≤ 64 characters");
    }
  }
  if (claude && openai) {
    for (const key of ["version", "description", "homepage", "repository"]) {
      if (JSON.stringify(claude[key]) !== JSON.stringify(openai[key])) {
        fail(
          name,
          `"${key}" differs between .claude-plugin/plugin.json and plugin.json`,
        );
      }
    }
    maxLen(at("plugin.json description"), openai.description, 4000);
  }

  const ui = openai?.extensions?.["com.openai"]?.interface;
  if (openai && !ui) {
    fail(at("plugin.json"), "extensions.com.openai.interface missing");
  }
  if (ui) {
    const w = (k) => at(`plugin.json interface.${k}`);
    maxLen(w("displayName"), ui.displayName, 30);
    maxLen(w("shortDescription"), ui.shortDescription, 30);
    maxLen(w("longDescription"), ui.longDescription, 4000);
    maxLen(w("developerName"), ui.developerName, 80);
    maxLen(w("category"), ui.category, 80);
    for (
      const k of [
        "websiteURL",
        "privacyPolicyURL",
        "termsOfServiceURL",
        "supportURL",
      ]
    ) {
      if (ui[k] !== undefined && !/^https:\/\/\S{1,1016}$/.test(ui[k])) {
        fail(w(k), "must be an https URL ≤ 1024 characters");
      }
    }
    const prompts = ui.defaultPrompt ?? [];
    if (prompts.length > 3) fail(w("defaultPrompt"), "at most 3 prompts");
    if (new Set(prompts).size !== prompts.length) {
      fail(w("defaultPrompt"), "prompts must be unique");
    }
    prompts.forEach((p, i) => maxLen(w(`defaultPrompt[${i}]`), p, 128));
    for (const k of ["brandColor", "brandColorDark"]) {
      if (ui[k] !== undefined && !/^#[0-9A-Fa-f]{6}$/.test(ui[k])) {
        fail(w(k), "must be #RRGGBB");
      }
    }
    for (const k of ["composerIcon", "composerIconDark", "logo", "logoDark"]) {
      if (ui[k] !== undefined) checkPath(w(k), dir, ui[k]);
    }
    for (const k of ["composerIcon", "logo"]) if (!ui[k]) fail(w(k), "missing");
    for (const s of ui.screenshots ?? []) checkPath(w("screenshots"), dir, s);
  }

  // Both hosts must reach the same server; each wants its own transport name.
  const claudeMcp = readJson(join(dir, ".mcp.json"))?.mcpServers ?? {};
  const openaiMcp = readJson(join(dir, "mcp.json"))?.mcpServers ?? {};
  const names = Object.keys(openaiMcp);
  if (names.length !== 1) {
    fail(at("mcp.json"), "OpenAI allows exactly one MCP server per plugin");
  }
  if (
    JSON.stringify(Object.keys(claudeMcp).sort()) !==
      JSON.stringify([...names].sort())
  ) {
    fail(name, ".mcp.json and mcp.json declare different servers");
  }
  for (const server of names) {
    const c = claudeMcp[server];
    const o = openaiMcp[server];
    if (!c || !o) continue;
    if (c.type !== "http") {
      fail(at(`.mcp.json ${server}`), 'type must be "http"');
    }
    if (o.type !== "streamable-http") {
      fail(at(`mcp.json ${server}`), 'type must be "streamable-http"');
    }
    if (c.url !== o.url) fail(name, `MCP url differs: ${c.url} vs ${o.url}`);
    if (!/^https:\/\//.test(o.url ?? "")) {
      fail(at(`mcp.json ${server}`), "url must be https");
    }
    if (o.headers && Object.keys(o.headers).length) {
      fail(at(`mcp.json ${server}`), "public submission rejects headers");
    }
  }

  checkSkills(name, join(dir, "skills"));
}

// ── Skills ────────────────────────────────────────────────────────────────────

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (kv) fields[kv[1]] = kv[2].trim();
  }
  return { fields, body: text.slice(m[0].length) };
}

function* markdownFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* markdownFiles(p);
    else if (entry.name.endsWith(".md")) yield p;
  }
}

function checkSkills(plugin, skillsDir) {
  if (!existsSync(skillsDir)) return fail(plugin, "no skills/ directory");
  const toolish = /\b(?:get|set|find|search)_[a-z_]+\b/g;

  for (const entry of readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillMd = join(skillsDir, entry.name, "SKILL.md");
    if (!existsSync(skillMd)) {
      fail(rel(join(skillsDir, entry.name)), "no SKILL.md");
      continue;
    }
    const fm = frontmatter(readFileSync(skillMd, "utf8"));
    if (!fm) {
      fail(rel(skillMd), "no --- frontmatter ---");
      continue;
    }
    const { fields, body } = fm;
    if (fields.name !== entry.name) {
      fail(rel(skillMd), `name "${fields.name}" ≠ directory "${entry.name}"`);
    }
    if (!NAME_RE.test(fields.name ?? "") || fields.name.length > 64) {
      fail(rel(skillMd), "name must be kebab-case, ≤ 64 characters");
    }
    maxLen(`${rel(skillMd)} description`, fields.description, 1024);
    for (const key of Object.keys(fields)) {
      if (!PORTABLE_KEYS.has(key)) {
        fail(rel(skillMd), `frontmatter key "${key}" is Claude Code only`);
      }
    }
    if (body.split("\n").length > 500) fail(rel(skillMd), "over 500 lines");
  }

  for (const file of markdownFiles(skillsDir)) {
    const text = readFileSync(file, "utf8");
    // Links inside code are templates for the agent ("[Réserver](app_link)").
    const prose = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
    for (const [, target] of prose.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(target) || target.includes("…")) continue;
      const path = target.split("#")[0];
      if (!existsSync(resolve(dirname(file), path))) {
        fail(rel(file), `broken link ${target}`);
      }
    }
    for (const [tool] of text.matchAll(toolish)) {
      if (!TOOLS.includes(tool)) fail(rel(file), `names unknown tool ${tool}`);
    }
  }
}

// ── Live probe ────────────────────────────────────────────────────────────────

async function probe(url) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
  });
  const challenge = res.headers.get("www-authenticate") ?? "";
  const meta = challenge.match(/resource_metadata="([^"]+)"/)?.[1];
  if (res.status !== 401 || !meta) {
    return fail(
      url,
      `expected a 401 naming resource_metadata, got ${res.status} ${
        (await res.text()).slice(0, 160)
      }`,
    );
  }
  const resource = await (await fetch(meta)).json().catch(() => null);
  if (!resource?.authorization_servers?.length) {
    return fail(
      meta,
      "protected-resource metadata names no authorization server",
    );
  }
  console.log(
    `live: ${url} → 401, authorization server ${
      resource.authorization_servers[0]
    }`,
  );
}

if (process.argv.includes("--live")) {
  const urls = new Set();
  for (const dir of pluginDirs.values()) {
    for (
      const s of Object.values(
        readJson(join(dir, "mcp.json"))?.mcpServers ?? {},
      )
    ) urls.add(s.url);
  }
  for (const url of urls) {
    try {
      await probe(url);
    } catch (e) {
      fail(url, `unreachable (${e.message})`);
    }
  }
}

if (problems.length) {
  console.error(problems.map((p) => `✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${pluginDirs.size} plugin(s) valid`);
