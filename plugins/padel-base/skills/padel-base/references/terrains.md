# Terrains et créneaux

## Chercher

- Les créneaux se lisent d'aujourd'hui à 7 jours. Plusieurs jours de suite (« ce week-end », « cette semaine ») : **une seule recherche** qui part du premier jour et couvre le nombre de jours voulu (8 au plus dans un club, 3 autour d'un lieu). Des jours qui ne se suivent pas : une recherche par jour.
- La réponse d'un club donne, jour par jour, ses créneaux libres : heure de début, heure de fin, durée. Un créneau libre sur plusieurs terrains n'apparaît qu'une fois. **Ni nom de terrain, ni nombre de terrains libres** : n'en affiche jamais. Les créneaux déjà commencés aujourd'hui sont retirés.
- Un jour listé dans `failed_days` n'a pas pu être lu : ne dis pas qu'il est complet. Dis que tu n'as pas pu le lire et propose de réessayer.
- Pour une heure précise, cherche toute la soirée ou toute la demi-journée plutôt qu'une fenêtre étroite, puis trie toi-même : tu pourras ainsi proposer les créneaux voisins si l'heure demandée est prise. L'heure de fin d'une fenêtre de recherche est l'heure de **fin** du créneau : une fenêtre trop serrée revient vide alors que des créneaux existent. Ne filtre sur l'heure ou la durée que si le joueur en a donné une.
- Recherche selon les disponibilités du joueur : elle porte sur un club, sur les 7 prochains jours au plus, et ne renvoie que les jours où un créneau tombe dans ses disponibilités. Si elle revient vide, cherche sur les jours de ses disponibilités et propose les créneaux qui débordent d'une demi-heure au plus, en le signalant. Si le joueur n'a pas de disponibilités enregistrées, demande-lui quand il est libre, enregistre, puis relance.
- Plusieurs clubs ou recherche autour d'un lieu : voir `recherche-zone.md`. Vise 5 clubs qui ont de la place avant de répondre.

## Quels créneaux retenir

- Ne garde que les créneaux qui commencent entre 6h et minuit, sauf si le joueur demande explicitement très tôt ou très tard.
- **Durées** : si le joueur a demandé une durée, ne garde que celle-là. Sinon, garde le 1h30 et le 2h : ce sont les durées que cherchent presque tous les joueurs.
- **Créneaux d'une heure (et moins)** : jamais dans l'affichage normal.
  - S'il existe du 1h30 ou du 2h pour la demande : ne les affiche pas. Si le club en a, ajoute une seule ligne discrète en bas, avant le lien : « Il y a aussi des créneaux d'1h, demandez-les si besoin. »
  - S'il n'existe ni 1h30 ni 2h à l'heure ou sur le moment demandé : alors seulement, propose le créneau d'une heure en le disant clairement : « Pas de 1h30 ni de 2h à 18h00, mais il reste un créneau d'1h : 18h00 – 19h00. »
  - Si le joueur demande une heure : affiche-les normalement.

## Choisir le format

Compte les créneaux retenus pour la demande (toute la journée, ou seulement le moment demandé, « samedi matin »), puis choisis :

| Créneaux sur la journée | Format |
| --- | --- |
| 1 à 12 | Format liste — une puce par créneau |
| 13 et plus | Format moments — par moment de la journée |

## Règles communes de mise en page

- **Toujours des puces** pour les créneaux. Des lignes sans puce se collent les unes aux autres à l'affichage et deviennent illisibles.
- **Un créneau par puce** dans le format liste : jamais deux créneaux sur la même ligne.
- **Heures des créneaux précis** (format liste, alternatives) : toujours au format long et uniforme, « 9h00 – 10h30 », « 18h00 – 20h00 ».
- **Heures du format moments** : format court, « 9h · 10h30 · 15h ».
- Le jour en gras au-dessus de ses créneaux quand la réponse couvre plusieurs jours.
- Le lien de réservation vient une seule fois, sous l'ensemble des créneaux d'un club.
- Jamais de nom de terrain ni de nombre de terrains : Padel Base ne les donne pas.

## Format liste — Une puce par créneau (1 à 12 créneaux)

Une puce par créneau, dans l'ordre chronologique. Les durées 1h30 et 2h se mélangent dans la même liste : l'heure de fin suffit à lire la durée.

> Mercredi après 14h à Carré Padel 🎾
>
> - 14h00 – 15h30
> - 14h30 – 16h30
> - 15h30 – 17h00
> - 16h00 – 18h00
> - 17h00 – 18h30
> - 17h30 – 19h30
> - 18h00 – 19h30
>
> Il y a aussi des créneaux d'1h, demandez-les si besoin.
>
> [Réserver mon terrain](https://go.padel-base.fr/carre-padel)

## Format moments — Par moment de la journée (13 créneaux et plus)

Un bloc par durée (1h30 puis 2h), et dans chaque bloc une puce par moment de la journée, avec les heures de début en format court.

| Moment | Début du créneau |
| --- | --- |
| 🌅 Matin | avant 12h |
| ☀️ Midi | de 12h à 13h59 |
| 🌤️ Après-midi | de 14h à 17h59 |
| 🌙 Soir | à partir de 18h |

- N'affiche pas un moment sans créneau.
- Plus de cinq heures dans un même moment : résume en plage, « de 9h à 11h30 (6 créneaux) ».
- Si la demande portait sur un moment (« samedi matin »), n'affiche que ce moment.
- Si une seule durée existe, un seul bloc. Si une seule durée existe sur toute une période de plusieurs jours, annonce-la une fois en tête de réponse.

> **Samedi 7/11 · créneaux de 1h30**
> - 🌅 Matin : 10h
> - 🌤️ Après-midi : 15h30 · 16h · 16h30 · 17h30
> - 🌙 Soir : 19h30 · 21h · 22h30
>
> **Samedi 7/11 · créneaux de 2h**
> - 🌅 Matin : de 9h à 11h30 (6 créneaux)
> - ☀️ Midi : 12h · 12h30 · 13h · 13h30
> - 🌤️ Après-midi : de 14h à 17h30 (7 créneaux)
> - 🌙 Soir : 18h · 19h · 20h · 22h
>
> [Réserver mon terrain](https://go.padel-base.fr/play-padel)

## Longueur maximale : 12 lignes de créneaux

Sur téléphone, un écran affiche environ 15 lignes. Une réponse ne dépasse pas 12 lignes de créneaux.

- Plusieurs jours qui dépassent la limite : détaille le premier jour (ou le jour le plus proche de la demande), puis résume chaque jour suivant en une ligne avec les moments où il reste de la place. Termine en demandant quel jour l'intéresse.
- Trois jours ou plus : une puce par jour avec les moments où il reste de la place, puis demande quel jour l'intéresse.

## Quand l'heure demandée est prise

1. Une ligne : « 19h00 est déjà pris jeudi à [club]. »
2. Les créneaux les plus proches, avant et après, dans le même club, en format liste (deux ou trois puces).
3. Si rien le même jour : le jour suivant le plus proche avec un créneau à une heure voisine.
4. Ajoute directement le même horaire dans le club proche le plus proche qui l'a de libre : une recherche autour de la ville du club (une puce, avec le lien, voir `recherche-zone.md`). Si aucun ne l'a, la suggestion de fin propose un autre jour.

Ne détaille jamais ce qui est occupé, ne justifie pas pourquoi c'est pris.

## Rien de libre

- Une ligne : « Plus rien de libre samedi à [club]. »
- Puis, directement, la **prochaine date** où il reste de la place (au même moment si le joueur en a demandé un), avec ses créneaux et le lien : une seule recherche sur les jours suivants suffit, jusqu'à 7 jours. Ne propose jamais de détailler un jour où il n'y a rien.
- Le joueur change plus facilement de jour que de lieu : la date d'abord, la zone ensuite.
- Suggestion de fin : « Je vous détaille [jour] ? » si tu n'as donné qu'un résumé, sinon un club proche (recherche par zone) à la date demandée.

> Plus rien de libre samedi soir à Play Padel. Dimanche soir, il reste :
> - 18h30 – 20h00
> - 20h00 – 22h00
>
> [Réserver mon terrain](https://go.padel-base.fr/play-padel)
>
> Je regarde samedi soir dans les clubs autour ?

## Si le joueur a des disponibilités

Après la réponse à sa demande, ajoute une ligne quand c'est utile :

> Sur vos créneaux habituels (samedi après-midi), il reste 14h00 – 16h00.

## Suggestion de fin

La suite sert à trouver des joueurs (SKILL.md, section 5) :

- Club qui gère les parties ouvertes dans son application (une recherche de ses parties ouvertes le dit, voir SKILL.md, section 5) : « Il vous manque des joueurs ? Réservez votre créneau en partie ouverte sur l'application du club, elle vous trouvera des partenaires. »
- Sinon, plusieurs créneaux affichés : « Dites-moi le créneau qui vous intéresse (et combien de joueurs il vous manque), je vous prépare l'annonce WhatsApp. » Un seul créneau : propose directement l'annonce (`annonces-whatsapp.md`).
