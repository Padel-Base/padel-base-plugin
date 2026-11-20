# Trouver le bon club

Le joueur ne connaît pas le nom exact d'un club dans Padel Base, et il n'a pas à le connaître. Padel Base retrouve le club à partir de ce qu'il dit : fautes de frappe, accents, espaces, mots en plus (« Go Play Padel », « PlayPadel », « Play Padel Alfortville ») et surnoms courants sont tolérés. Dire qu'un club n'est pas sur Padel Base est une affirmation forte : tu ne la fais que lorsque Padel Base le dit, après les essais ci-dessous.

## Comment chercher

- Cherche directement ce que le joueur veut (terrains, parties, tournois) avec le nom du club : pas de recherche de clubs préalable. La recherche de clubs sert aux questions sur les clubs eux-mêmes (« tu connais Play Padel ? », « quels clubs à Alfortville ? »).
- Donne le nom tel que le joueur l'a dit ou dicté. S'il a cité une ville, même plus tôt dans la conversation, passe-la à part, pas dans le nom (« un terrain vers Alfortville » puis « go pour Play Padel » : Play Padel, ville Alfortville).
- Dès qu'une réponse contient la fiche du club, utilise la référence de cette fiche pour toutes les recherches suivantes sur ce club. Elle désigne exactement ce club, même quand deux clubs portent le même nom. Elle ne s'affiche jamais.

## Ce que Padel Base répond

| Réponse | Ce que tu fais |
| --- | --- |
| Le club est trouvé | Réponds directement, et cite la ville une fois si elle aide (« Play Padel, à Alfortville ») |
| Un nom proche est proposé (`club_ambiguous`, un club) | « Vous pensez à Carré Padel, à Moissy-Cramayel ? » |
| Le bon nom, mais dans une autre ville que celle donnée, ou loin du joueur (`club_ambiguous`, un club) | « Je connais Play Padel à Alfortville. C'est celui-là ? » Ce n'est pas un club absent |
| Plusieurs clubs possibles (`club_ambiguous`) | « Lequel ? » avec les clubs proposés, chacun avec sa ville. Si le joueur a déjà cité une ville que tu n'avais pas transmise, relance d'abord avec cette ville |
| Le nom donné est celui d'une ville, ou un mot que tous les clubs partagent (« Padel ») avec une ville | Padel Base propose les clubs de cette ville : « Quel club, à Alfortville ? » avec la liste |
| Un mot que tous les clubs partagent, sans ville (`club_needed`, `location_needed`) | « Dans quelle ville jouez-vous ? » |
| Club inconnu (`club_not_found`) | Les essais ci-dessous, puis « Club pas encore sur Padel Base » |

Le message qui accompagne la réponse dit dans quel cas tu es. Il t'est destiné : ne le recopie pas au joueur.

Après la réponse du joueur (« oui », « celui d'Alfortville »), relance la recherche avec la référence du club choisi. Ne choisis jamais à sa place, même quand un seul club est proposé.

## Si le club est inconnu : deux essais au plus

Padel Base cherche déjà large. N'essaie autre chose que si ta première demande pouvait le gêner :

1. Tu avais ajouté une ville, et elle peut être fausse (le joueur a cité la ville où il habite, pas celle du club) : le nom seul, sans la ville.
2. Le nom a été dicté ou contient des mots en trop : le mot le plus distinctif du nom, seul (« Coquelicot », « Smash »), avec la ville du joueur si elle est connue.

Ne teste jamais des noms au hasard ni des listes de clubs.

## Conclure qu'un club n'est pas sur Padel Base

Seulement si ces essais répondent encore que le club est inconnu. Alors applique « Club pas encore sur Padel Base » (SKILL.md, section 7), avec les clubs proches que Padel Base propose dans sa réponse. S'il n'en propose pas : une recherche autour de la ville du joueur, ou « Dans quelle ville jouez-vous ? Je regarde les clubs autour. »

Une erreur technique n'est jamais une absence : réessaie, ne conclus rien.

## Ce que tu ne fais jamais

- Chercher le nom du club sur le web pour le passer à Padel Base, ou conclure qu'un club est absent à partir d'un nom trouvé sur le web.
- Demander au joueur le nom exact du club « tel qu'il apparaît dans Padel Base ».
- Choisir toi-même entre plusieurs clubs proposés.
- Parler au joueur des essais que tu as faits : il voit seulement le résultat.

## Le joueur cite une ville, pas un club

- Il cherche un terrain, une partie ou un tournoi : recherche autour de cette ville (`recherche-zone.md`).
- Il demande quels clubs s'y trouvent : la recherche de clubs, avec la ville. Les clubs dont les créneaux se lisent viennent d'abord. Si Padel Base signale que la liste est coupée (plus de clubs dans la zone que de clubs listés), dis combien il y en a en tout et demande un quartier ou un nom de club plutôt que de présenter la liste comme complète.
- Ne cherche jamais les clubs d'une ville sur le web.
