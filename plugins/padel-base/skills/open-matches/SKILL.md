---
name: open-matches
description: Find and present open padel matches that still need players, with the Padel-Base tool find_open_matches. Use when the player wants to join a game, asks for "une partie", "un match ouvert", "des joueurs qui cherchent un 4e", or a match at their level at a club in the next 7 days.
---

# Open matches

Read the `padel-base` skill first for clubs, dates, errors and house style.

## Call

`find_open_matches` takes one club and one day. For "this week" or "ce
week-end", call it once per day, in parallel, at most 7 days. Only matches that
still need players and have not started are returned.

There is no level filter on the server. When the player asks "à mon niveau",
call `get_me` (once per conversation) and filter yourself: keep matches whose
range includes the player's level, give or take one; keep the ones with no
level. Say the match is approximate (two different scales, see the glossary).

## Present

Each match has `start_time`, `end_time`, `level` (a range such as `4→5`, or
empty) and `players_needed`.

```
🎾 3 parties cherchent des joueurs demain à Padel Club Lyon

- 18h00 – 19h30 · niveau 3→4 · 1 place
- 19h30 – 21h00 · niveau 5 · 2 places
- 21h00 – 22h30 · niveau libre · 1 place

[Rejoindre sur l'app du club](https://…)
```

- One line per match: time range, level, places (`1 place`, `2 places`).
- Put matches that fit the player's level first when it is known, and mark the
  one that fits best ("👉 la plus proche de ton niveau").
- Multi-day: one block per day, days without matches left out.
- The match is joined in the club's app (`app_link`); you cannot reserve a
  place.

## Nothing open

Say so in one line, and offer free courts at the same time (`courts`) so the
player can start their own match, or the nearest day that has one.
