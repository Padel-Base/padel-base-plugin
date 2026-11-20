# Padel Base

Find somewhere to play padel in France, from Claude or ChatGPT: free courts,
open matches that still need players, and federal (FFT) tournaments you can
still enter, in one club or around a place. The plugin also keeps your level and
weekly availabilities, so "when can I play this week?" is answered on your own
slots, and it drafts the message you post in your WhatsApp group to find
players.

It never books, registers or pays. Every result links to the club's booking page
or to the tournament registration page.

## What's inside

- **One remote MCP server**, `padel-base`, at
  `https://api.padel-base.fr/functions/v1/mcp-server/mcp`, run by Padel Base.
  Nine tools: `search_clubs`, `find_courts`, `find_courts_for_me`,
  `find_open_matches`, `search_tournaments`, `get_me`, `set_level`,
  `get_availabilities`, `set_availabilities`.
- **One skill**, `padel-base`: how to choose a tool, read its answer and present
  it to a player (in French by default). Its `references/` hold the detail per
  subject: finding a club, searching around a place, courts, tournaments, open
  matches, WhatsApp ads, estimating a level, club information.

No hooks, no scripts, no local code: the plugin is text files and its logo and icons.

## Sign-in

OAuth 2.1. On first use you enter your email, receive a one-time code, and
approve the connection. No password. The account is created on first sign-in.

## What the plugin sends, stores and fetches

- **Sent to the Padel Base server**, only when a tool is called: what you asked
  for (club name, city, the coordinates of the place to search around, days,
  time window, tournament filters), and your level and weekly availabilities
  when you ask to save them.
- **Stored by Padel Base**: your email, the first name, gender and phone number
  you may give on the sign-up page, your level and your weekly availabilities.
- **Analytics**: the server records tool calls (arguments and answers) to
  improve the service, including club names that were not found.
- **Fetched by the server**: free slots and open matches from the clubs' online
  booking systems, and tournaments from the federal calendar.
- The two write tools are `set_level` and `set_availabilities` (which replaces
  the whole weekly set). Nothing else changes anything.
- The skill may read a club's official website, when you ask for practical
  information the club card does not hold.

Privacy policy: <https://www.padel-base.fr/privacy>. Terms:
<https://www.padel-base.fr/terms>. Contact: <contact@padel-base.fr>.

## Install

In Claude Code:

```
/plugin install padel-base --marketplace Padel-Base/padel-base-plugin
```

Codex, ChatGPT and Claude Desktop: see the
[repository README](https://github.com/Padel-Base/padel-base-plugin#install).

## Try it

- « Un terrain libre demain soir à Alfortville ? »
- « Jeudi 19h à Play Padel »
- « Des parties ouvertes ce soir près de chez moi ? »
- « Quels tournois P100 autour de Lyon ce mois-ci ? »
- « Je joue le mardi soir et le samedi matin. »

Clubs are named as you would say them: spelling, accents and spacing are
tolerated.

## License

[Apache-2.0](LICENSE). The Padel Base name and logo are trademarks: see
[NOTICE](NOTICE).
