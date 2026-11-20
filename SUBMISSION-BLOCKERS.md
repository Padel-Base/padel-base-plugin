# What blocks submission

State on 2026-11-16, plugin version 0.2.0. Delete this file once everything is
ticked. How to submit is in [README.md](README.md#publish-to-the-directories);
`npm run validate` repeats the items it can detect.

"Both" means the Claude directory and the ChatGPT / Codex directory.

## Blocking

- [x] **1. The MCP server is not live in production** (both)

  `https://api.padel-base.fr/functions/v1/mcp-server/mcp` answers 404
  `Requested function was not found`. Both stores scan and test the production
  server.

  Done when: `npm run validate:live` passes (a 401 naming the OAuth metadata).

- [x] **2. No support page** (both)

  Both stores require an https support URL. Checked on 2026-11-20:
  `https://www.padel-base.fr/support` (and `/en/support`) answers 200 with a
  contact address, a response time and troubleshooting. Its URL is set as
  `supportUrl` in `plugins/padel-base/.claude-plugin/plugin.json` and as
  `interface.supportURL` in `plugins/padel-base/plugin.json`.

  Left to do on the site: the page says the app can be opened from the ChatGPT
  and Claude directories. Reword it until the listings exist.

- [x] **3. Tool annotations are not deployed** (both)

  Claude requires a `title` on every tool; OpenAI requires `readOnlyHint`,
  `destructiveHint` and `openWorldHint` as explicit booleans. The fix is written
  in `supabase-backend` (`supabase/functions/_shared/mcp/tools.ts`, with a test)
  but is uncommitted on `main` there.

  Done when: it is merged and deployed with item 1.

- [ ] **4. Analytics arguments removed from the tool schemas, not deployed**
      (both)

  `@posthog/mcp` added `context`, `llm_model` and `conversation_id` to each
  tool's input schema. OpenAI rejects inputs that carry conversation context or
  "just in case" fields; Claude rejects collecting conversation data beyond what
  the tool needs. They are now turned off in `supabase-backend`
  (`supabase/functions/mcp-server/posthog.ts`, with a test), uncommitted on
  `main` there. Tool calls are still recorded with their arguments and answers.

  Done when: it is merged and deployed with items 1 and 3, and `tools/list` in
  production shows only each tool's own arguments.

  Checked on 2026-11-20 through the connected Padel Base connector: the tool
  schemas carry only each tool's own arguments. That is not a raw `tools/list`
  with a token, so confirm that once before submitting.

- [x] **5. Privacy policy must match what the plugin does** (both)

  It has to cover: email, first name, gender and phone; level and weekly
  availabilities; the searches sent (club, city, coordinates); and the recording
  of tool calls with their arguments and answers for analytics. It must state
  purposes, recipients, retention and how to contact you. Claude rejects
  immediately on a missing or incomplete policy.

  Done when: `https://www.padel-base.fr/privacy` covers every line of "What the
  plugin sends, stores and fetches" in `plugins/padel-base/README.md`.

  Checked in production on 2026-11-20 (`/privacy` and `/en/privacy`, updated
  20 Nov 2026): email, first and last name, gender, phone, level,
  availabilities, searches including coordinates, the recording of each call
  with what was sent and the answers returned, fetching from the clubs' booking
  systems and the federal calendar, purposes, recipients, retention, contact and
  CNIL. The one README line it does not cover is the skill reading a club's own
  website: the user's AI does that, not Padel Base's servers.

- [x] **6. Reviewer test account: built, not set up** (OpenAI; Claude on
      Verified review)

  OpenAI needs a demo account with sample data that signs in without an email
  code, SMS code or magic link. `supabase-backend` now has a reviewer login (one
  address signs in with a fixed 10-digit code) and a script that creates the
  account with a level and availabilities. Uncommitted on `main` there. Steps:
  `docs/mcp-server-getting-started.md`, "Reviewer account".

  Done when: the change is deployed, `deno task mcp:reviewer` has been run
  against production, `MCP_REVIEWER_EMAIL` is set on the functions service, and
  you have signed in once with the address and the code the script printed.
  The credentials go in each portal, never in the package. After the review,
  delete the account (`deno task mcp:reviewer --delete`): the code is a
  password and stays valid until then.

- [ ] **7. Domain verification: built, not set up** (OpenAI)

  The server now answers the token at `/.well-known/openai-apps-challenge`, and
  the gateway template has the route that exposes it at the host root.
  Uncommitted on `main` in `supabase-backend`. The gateway route has not been
  run on Envoy yet.

  Done when: the change is deployed, the gateway route is installed
  (`infra/envoy/README.md`), `OPENAI_APPS_CHALLENGE` holds the portal's token,
  `curl https://api.padel-base.fr/.well-known/openai-apps-challenge` prints it,
  and **Verify Domain** passes in the portal.

- [ ] **8. Demo video** (OpenAI)

  A reviewer-accessible walkthrough of the main use cases.

  Done when: its URL is in `extensions["com.openai"].review.demo_recording_url`
  in `plugins/padel-base/plugin.json`.

- [x] **9. Verified developer identity** (OpenAI)

  Individual or business verification in the OpenAI organisation settings. The
  directory shows that name as the developer.

- [ ] **10. Run the eight review test cases** (OpenAI)

  The five positive and three negative cases are in `plugin.json`. Each positive
  case must be run against the test account before submitting. They name real
  clubs (Play Padel in Alfortville) and places (Créteil, Lyon): check those
  return data in production.

- [ ] **11. Submit the MCP server as a connector too** (Claude)

  The plugin points at a server you run, so Claude expects it as its own
  connector submission, with its own listing (name, one-liner, description,
  categories, documentation URL, privacy policy, support contact, icon).

## Before you press submit

- [ ] Commit and merge `feat/skill-v2-directory-ready`; the Claude directory
      reads the repository, plugin path `plugins/padel-base`.
- [ ] `npm run package:openai` on a machine with `zip` (not run so far).
- [ ] Read the Anthropic Software Directory Policy
      (`support.claude.com/en/articles/13145358`). It could not be fetched while
      preparing this, so nothing was checked against it.
- [ ] Read OpenAI's auth and app-review pages
      (`developers.openai.com/plugins/build/auth`, `/plugins/deploy/app-review`),
      also not read.

## Open decisions

- **Naming data sources.** The skill and README now say data comes from "the
  clubs' online booking systems" and "the federal calendar" when a player asks,
  because both stores forbid concealing behaviour. The backend deliberately
  names no source in tool descriptions (a test enforces it). No provider is
  named here either, but confirm this wording suits you.
- **Category.** `Entertainment` on ChatGPT (`Productivity` was flagged by the
  review: "We couldn't confirm the selected category"; there is no sports
  category, `Other` is the fallback), `lifestyle` in the Claude marketplace
  file. The ChatGPT short description now says it is about padel.
- **Countries.** The ChatGPT listing is limited to France, Belgium and
  Luxembourg (`publication.countries: ["FR", "BE", "LU"]`). The Claude manifest
  has no country field, so the Claude listing is not restricted. The listing
  texts still say "in France": reword them if Belgian and Luxembourg clubs are
  covered.
- **The "Verified" label** (Claude) has no application: Anthropic decides during
  review.
