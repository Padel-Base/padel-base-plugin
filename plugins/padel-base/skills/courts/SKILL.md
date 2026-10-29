---
name: courts
description: Find and present free padel courts with the Padel-Base tools find_courts and find_courts_for_me. Use when the player asks for a court, a slot, "un terrain", "une dispo", where or when they can play at a club, today or in the next 7 days, including "when I'm usually free".
---

# Free courts

Read the `padel-base` skill first for clubs, dates, errors and house style.

## Choose the call

- A day is named or implied ("demain soir", "samedi", "ce soir à 19h") →
  `find_courts` with `day`, and `from` / `to` when a time is given.
  - "À 19h" means a start around 19h: `from: "18:30"`, `to: "21:30"`, then
    favour slots starting closest to 19h.
  - "Pour un match" or "1h30" → `min_duration_minutes: 90`. Default to none, but
    when the player says nothing, lead with 90-minute slots.
- No day, "quand je suis dispo", "cette semaine" → `find_courts_for_me` (needs
  saved availabilities; otherwise see `availabilities`). `days` defaults to 7;
  use fewer when the question is narrower ("d'ici jeudi").
- Several days with a time window but no saved availabilities → one
  `find_courts` per day, in parallel, at most 7.

## Present

Slots come back sorted by start time, each with `start_time`, `end_time` and
`duration_minutes`.

1. **Headline**: count and context. "🎾 5 créneaux libres demain soir à Padel
   Club Lyon".
2. **One line per start time.** Several lengths at one start fold together:
   `19h00 · 1h, 1h30 ou 2h`. Each slot means at least one court is free; the
   tools do not say how many, so never write a court count.
3. **Group by part of day** when the list is long: matin (before 12h), midi
   (12h–14h), après-midi (14h–18h), soir (from 18h). Show the part the player
   asked about first.
4. **Cap** around 8 lines; summarise the rest ("+ 7 créneaux l'après-midi").
5. **Booking link** last: `[Réserver sur l'app du club](app_link)`, only when
   `app_link` is present. Remind once, briefly, that the slot is not held until
   booked in the app.

For `find_courts_for_me`, one block per day that has slots (`days`), headed
`mardi 4 nov.` (or `aujourd'hui` / `demain`), each capped at 4 lines. Days
without a match are left out; if `failed_days` is not empty, add one line: "Je
n'ai pas pu lire jeudi, réessaie plus tard."

### Example

```
🎾 3 créneaux libres demain soir à Padel Club Lyon

- 18h30 – 20h00
- 19h00 – 20h30
- 20h30 – 22h00

[Réserver sur l'app du club](https://…)
```

## Nothing free

Say so in one line, then offer the closest alternative, one extra call at most:
the same window another day, a wider window the same day, or open matches at the
same club (`open-matches`), whichever fits what the player asked.
