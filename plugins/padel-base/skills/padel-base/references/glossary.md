# Padel-Base glossary

## Player level (1–8)

Padel-Base's own scale, stored on the profile (`get_me`, `set_level`). The
labels are the ones the WhatsApp bot shows; reuse them.

| Level | Label                    | What it means                                                |
| ----- | ------------------------ | ------------------------------------------------------------ |
| 1     | Niv. 1 - Débutant        | Découverte du jeu, règles et coups de base                   |
| 2     | Niv. 2 - Intermédiaire   | Coups fondamentaux, échanges plus longs                      |
| 3     | Niv. 3 - Intermédiaire + | Régularité, placements et stratégies de base                 |
| 4     | Niv. 4 - Confirmé        | Montée à la volée, effets, défense avec les vitres           |
| 5     | Niv. 5 - Avancé          | Jeu rapide, variations tactiques, défense des doubles vitres |
| 6     | Niv. 6 - Expert          | Bandeja, vibora, finition face à une défense solide          |
| 7     | Niv. 7 - Expert +        | Compétition élevée, phases finales de haut niveau            |
| 8     | Niv. 8 - Élite           | Meilleurs joueurs nationaux, circuits pros                   |

A player unsure of their level can be asked two or three questions from the
"What it means" column; propose a level, and only call `set_level` once they
agree.

## Open-match level (1–9)

Clubs' booking apps rate matches on a 1–9 scale, returned as a range:

- `4→5`: players from 4 to 5 are expected. `5` alone: a single level.
- Half steps keep the French comma: `4,5→5,5`.
- Empty: the organiser set no level. Say "niveau libre" or leave it out.

Some apps map their labels onto this scale (Débutant 1, P50 2, P100 3, P200 4,
P300 5, P400 6, P500 7, P700 8, P1000 9). It is close to, but not the same as,
the player's 1–8 scale: compare loosely and say so.

## Tournaments

Federal (FFT) tournaments, read from padelclub.app and Ten'Up.

- **Homologation** (`level`): from P25 up to P2000 (P25, P100, P250, P500,
  P1000, …). The number is roughly the ranking points the winners earn; higher
  means stronger fields. Rough guide for a player new to competition: P25 first,
  P100 once comfortable.
- **Tableau**: one draw of a tournament, by level × gender × age. One tournament
  often has several; each is its own result, so a "3 tournois" count can be one
  event with three tableaux. Group them when presenting.
- **Gender**: `H` (Hommes), `F` (Femmes), `Mixte`.
- **Age**: `Senior` (open), `45 ans`, `17/18 ans`, …
- **Status**: `open` (inscriptions ouvertes), `waitlist` (liste d'attente),
  `null` (the club does not publish its registrations online; the federal
  listing still shows the tournament: check on the registration page). Closed
  tableaux are never returned.
- **Places**: `teams_registered` / `max_teams` teams (pairs), when known.
- **Price**: `price_eur` is per player.
- `registration_url`: padelclub.app registration when the club uses it,
  otherwise the Ten'Up page.

## Courts

- A **slot** is a free start/end time on at least one court. Identical slots on
  several courts are merged by the server, so the number of free courts is never
  known: do not state one.
- Typical lengths: 60, 90 (the most common for a match) and 120 minutes.
- Prime time: weekday evenings 17h–21h, weekend mornings. Those go first.
