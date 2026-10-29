---
name: availabilities
description: Read, explain and change a padel player's weekly availabilities and level with the Padel-Base tools get_availabilities, set_availabilities, get_me and set_level. Use when the player says when they usually play ("je joue le mardi soir"), wants to add, remove or see their slots ("mes dispos"), or wants to see or change their level.
---

# Availabilities and level

Read the `padel-base` skill first for house style.

Availabilities are weekly slots (`day_of_week` 1 = lundi … 7 = dimanche,
`start_time`, `end_time`, 24 h). They drive `find_courts_for_me` and the
WhatsApp `/terrains` command, so a mistake here changes what the player is shown
everywhere.

## Changing them: read, merge, confirm, write

`set_availabilities` **replaces the whole set**: anything not sent is deleted.

1. `get_availabilities` first, every time, even if the player restates
   everything.
2. Build the new set from what they said:
   - "Ajoute le jeudi soir" → current set + Thursday.
   - "Plus le lundi" → current set − Monday.
   - "Je joue le mardi et le jeudi soir" (a full description) → ask whether it
     replaces or adds to the current slots, unless there are none.
3. Turn words into times: matin 08:00–12:00, midi 12:00–14:00, après-midi
   14:00–18:00, soir 18:00–22:00, "après le boulot" 18:00–22:00, "toute la
   journée" 08:00–23:00, "le week-end" = samedi + dimanche. Use the player's own
   hours when given.
4. Same day, overlapping or touching slots: merge them (18:00–20:00 and
   19:00–22:00 → 18:00–22:00). The server refuses overlaps.
5. **Show the new week and ask for a yes** before writing, unless the player
   already gave exact slots and said to save them.
6. `set_availabilities` with the full set. Confirm in one line with the result.

An empty list clears everything: only on an explicit request ("efface mes
dispos"), confirmed.

## Present

One line per day, Monday first, days without slots left out:

```
📅 Tes disponibilités

- Mardi · 18h – 22h
- Jeudi · 12h – 14h, 18h – 22h
- Samedi · 9h – 12h
```

After a change, offer the natural next step once: "Je regarde les terrains
libres sur ces créneaux ?" (`find_courts_for_me`).

## Level

- `get_me` gives `level` (1–8, `null` if never set). Show it with its label from
  [the glossary](../padel-base/references/glossary.md): "Niv. 4 - Confirmé".
- `set_level` with a whole number 1–8. If the player is unsure, describe two
  neighbouring levels and let them choose. Confirm with the new label.
