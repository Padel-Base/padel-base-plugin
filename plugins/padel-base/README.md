# Padel-Base

Find somewhere to play padel at a Padel-Base club, from Claude or ChatGPT: free
courts, open matches that still need players, and federal (FFT) tournaments you
can still enter. The plugin also keeps your level and weekly availabilities, so
"what can I play this week?" is answered on your own slots.

It never books or pays. Every result links to the club's booking app or to the
tournament registration page.

## What's inside

- **MCP server** `padel-base`, at
  `https://api.padel-base.fr/functions/v1/mcp-server`. Sign-in is OAuth: enter
  your phone number, receive a 6-digit code on WhatsApp from the Padel-Base
  number, approve. You must have written to that number in the last 24 h.
- **Skills**, which tell the assistant how to use the tools and present the
  results:

| Skill            | For                                                            |
| ---------------- | -------------------------------------------------------------- |
| `padel-base`     | Shared rules: tool choice, clubs, dates, errors, house style   |
| `courts`         | Free courts on a day, or on your usual slots                   |
| `open-matches`   | Matches that need players, at your level                       |
| `tournaments`    | FFT tournaments open to entry, grouped by event                |
| `availabilities` | Your weekly slots and level, changed safely                    |
| `plan-my-week`   | Courts, matches and tournaments combined into one plan per day |

## Install

In Claude Code:

```
/plugin install padel-base --marketplace Padel-Base/padel-base-plugin
```

Codex, ChatGPT and Claude Desktop: see the
[repository README](../../README.md#install).

## Try it

- « Quels terrains sont libres demain soir à _<club>_ ? »
- « Je joue le mardi et le jeudi soir, et le samedi matin. »
- « Qu'est-ce que je peux jouer cette semaine à _<club>_ ? »
- « Des P100 mixtes ouverts ce mois-ci à _<club>_ ? »

Clubs are named as you would say them; case and accents do not matter.
