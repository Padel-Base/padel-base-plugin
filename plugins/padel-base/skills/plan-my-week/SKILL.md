---
name: plan-my-week
description: Combine the Padel-Base tools into one plan of what a player can play, over a day, a weekend or a week at a club - free courts, open matches and tournaments together. Use for open questions like "qu'est-ce que je peux jouer cette semaine ?", "je veux jouer samedi", "plan my padel week", or "what's the best option tonight?".
---

# Plan my week

Read the `padel-base` skill first, and the `courts`, `open-matches` and
`tournaments` skills for how each kind of result is shown.

## Gather

1. `get_me` for level and whether availabilities exist (once per conversation).
2. The club: ask if none is known yet. One club per plan; offer a second plan
   for another club afterwards.
3. In parallel:
   - Courts: `find_courts_for_me` when availabilities exist, else `find_courts`
     for each day asked (at most 7).
   - Open matches: `find_open_matches` for each day asked (at most 7). With
     availabilities, keep matches that start inside them.
   - Tournaments: `search_tournaments` once, kept to the days asked.

For "ce soir" or "samedi", one day: that is three calls, not twenty.

## Rank

For each day, suggest **one best option**, in this order of preference unless
the player said otherwise:

1. An open match at their level that fits their slots: no need to find three
   other players.
2. A tournament they can enter that day, at a homologation that suits them.
3. A free court of 90 minutes in their slots: they bring their own players.

Say why in a few words ("il ne manque qu'un joueur", "1h30 libre pile à 19h").

## Present

```
📅 Ta semaine à Padel Club Lyon

**Mardi 4 nov.**
👉 Partie ouverte 19h30 – 21h, niveau 3→4, 1 place
Aussi : terrain libre à 18h30

**Jeudi 6 nov.**
👉 Terrain libre 19h – 20h30

**Samedi 8 nov.**
👉 Tournoi P100 Mixte, inscriptions ouvertes, 25 €

[Réserver ou rejoindre sur l'app du club](https://…) · [S'inscrire au P100](https://…)
```

- Days with nothing are left out; say so at the end in one line if the player
  asked about them ("Rien de libre mercredi.").
- One "Aussi" line at most per day.
- Links at the end, each one from a tool result.
- Offer to dig into one day, or to set availabilities if none exist.
