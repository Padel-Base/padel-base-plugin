# Tournois

## Chercher

- Les tournois se lisent sur les 30 prochains jours, et seuls ceux où l'on peut encore s'inscrire (inscriptions ouvertes ou liste d'attente) sont renvoyés, du plus proche au plus lointain. Il n'y a pas de filtre par date : trie toi-même si le joueur demande « ce week-end ».
- Filtres possibles, seulement si le joueur les a cités : l'homologation (P25, P100, P250, P500, P1000, P2000) et la catégorie (Hommes, Femmes, Mixte). Pas de filtre par âge : trie toi-même.
- Un club : 20 tournois au plus par défaut ; `total` dit combien il y en a en tout.
- Autour d'un lieu ou sans club cité : une recherche lit les 5 clubs les plus proches qui ont des tournois, 5 tournois par club (voir `recherche-zone.md`). Plusieurs clubs : le club sur chaque ligne.
- Les tournois ne dépendent pas des créneaux : un club dont les créneaux ne se lisent pas peut avoir ses tournois. La fiche d'un club dit s'il en a.

## Nettoyer avant d'afficher

- **Un tournoi sur plusieurs jours arrive une fois par jour**, et un même tournoi a une entrée par tableau (homologation × catégorie × âge). Même titre, même homologation, même catégorie, même âge sur des jours qui se suivent = un seul tournoi : une seule ligne, à sa première date (« Sam. 7 et dim. 8/11 »).
- **Doublons** : même date, même homologation, même catégorie, même âge = un seul tournoi. Garde la version la plus complète (places, heure, prix).
- **Tournois commencés** : écarte ceux d'aujourd'hui dont l'heure est passée.
- **Titre** : n'affiche pas le titre brut. Reconstruis la ligne à partir de la date, de l'heure, de l'homologation et de la catégorie.

## Afficher

Une puce par tournoi, dans l'ordre des dates, cinq au plus :

> - 📅 Dim. 8/11, 13h00 — P250 Mixte · 11/20 équipes · 25 € — [S'inscrire](lien)

- Catégorie : Hommes, Femmes ou Mixte. Catégorie d'âge si ce n'est pas « Senior ».
- Heure, places (équipes inscrites / maximum) et prix seulement s'ils sont connus. N'écris jamais « inconnu » : omets.
- Certains tournois n'ont que la date et le type, sans état des inscriptions. Leur lien s'appelle « Voir les places et s'inscrire » au lieu de « S'inscrire », pour que le joueur sache où trouver le détail.
- Le lien est celui que Padel Base donne avec le tournoi. Tournoi sans lien : le téléphone du club à la place.
- Complet avec liste d'attente : « liste d'attente » à la place des places.
- Plus de cinq tournois : garde les cinq plus proches dans le temps, puis une ligne d'information, avec le nombre tiré de `total` : « Et 11 autres dans les 30 prochains jours, dites-moi un niveau ou une catégorie pour filtrer. » La suggestion de fin reste l'annonce.

## Suggestion

- Par défaut : « Lequel vous intéresse ? Je vous prépare l'annonce pour trouver votre partenaire. » (`annonces-whatsapp.md`). Un seul tournoi par annonce, sauf demande explicite.
- Jamais une question pour filtrer (type de tournoi, niveau, catégorie) en suggestion de fin : le filtre n'apparaît que dans la ligne d'information au-delà de cinq tournois.
- Le joueur choisit un tournoi : l'annonce partenaire, puis le lien « S'inscrire ».
- Le joueur a déjà un partenaire : un créneau libre pour s'entraîner avant le tournoi, si le club en a.
- Aucun tournoi dans ce club (liste vide, ou tournois non lisibles pour ce club) : « [Club] n'a pas de tournoi publié actuellement. » puis « Je regarde les tournois autour du club ? » (recherche autour de sa ville).
