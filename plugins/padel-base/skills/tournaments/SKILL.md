---
name: tournaments
description: Find and present federal (FFT) padel tournaments a player can still enter, with the Padel-Base tool search_tournaments. Use when the player asks about tournaments, "un tournoi", "un P100", "des tournois ce mois-ci", homologation levels (P25 to P2000), men's, women's or mixed draws at a club in the next 30 days.
---

# Tournaments

Read the `padel-base` skill first for clubs, dates, errors and house style, and
[the glossary](../padel-base/references/glossary.md) for P-levels, tableaux and
statuses.

## Call

`search_tournaments` takes one club and returns the next 30 days, open or on
waitlist, soonest first. Filters: `level` (`P100`), `gender` (`H`, `F`,
`Mixte`), `limit` (default 20, max 50). `total` is the count before the limit.

- "Hommes" / "messieurs" → `H`, "femmes" / "dames" → `F`, "mixte" → `Mixte`.
- Dates ("ce week-end", "en novembre") and age categories are not server
  filters: filter the result yourself on `date` and `age`.
- "À mon niveau": the player's 1–8 level does not map onto P-levels. Do not
  filter by guess; show what there is, cheapest homologations first, and say
  which one usually suits a first competition (glossary).

## Present

**Group tableaux of one tournament**: entries with the same `title` and `date`
are one tournament with several draws. Show it once, its tableaux on one line.

```
🏆 3 tournois à venir à Padel Club Lyon

**Samedi 8 nov.** · Tournoi d'automne · 9h00
P100 Hommes · P100 Mixte · P250 Hommes
Inscriptions ouvertes · 12/16 équipes · 25 € par joueur
[S'inscrire](https://…)

**Dimanche 16 nov.** · Open du club
P25 Femmes · liste d'attente
[S'inscrire](https://…)
```

- Date and title first, then `start_time` when known.
- Status in words: `open` → "Inscriptions ouvertes", `waitlist` → "Liste
  d'attente", `null` → nothing, but note the registration page has the details.
- Places as `teams_registered/max_teams équipes` when both are known; say "Plus
  que N places" when 3 or fewer remain.
- Price per player when known.
- One `[S'inscrire](registration_url)` per tableau, or per tournament when all
  its tableaux share it. Leave out tableaux without a URL rather than make one
  up.
- Cap at about 6 tournaments; if `total` is larger, say how many more and offer
  a filter (level, gender, weekend).

## Nothing found

`status: unsupported` means the club has no federal tournament code on file: say
Padel-Base does not follow this club's tournaments yet. An empty list with
filters: offer to drop a filter (another level, all genders). Without filters:
"Aucun tournoi ouvert dans les 30 prochains jours".
