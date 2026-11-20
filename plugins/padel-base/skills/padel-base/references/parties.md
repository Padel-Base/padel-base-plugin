# Parties ouvertes

Une **partie ouverte** est une partie créée dans l'application de réservation du club : le joueur la rejoint là-bas, et tout (inscription, échanges, partage) s'y passe. Une annonce WhatsApp n'est pas une partie ouverte : c'est une **recherche de joueurs**.

## Chercher

- Les parties se lisent d'aujourd'hui à 7 jours. Plusieurs jours de suite (« ce week-end ») : une seule recherche qui couvre ces jours (8 au plus dans un club, 3 autour d'un lieu). Seules les parties où il manque des joueurs et qui n'ont pas commencé sont renvoyées.
- Chaque partie a son heure de début et de fin, son niveau tel que le club l'indique, et le nombre de joueurs manquants. Il n'y a pas de filtre par niveau dans la recherche : trie toi-même.
- Autour d'un lieu ou sans club cité : voir `recherche-zone.md`. Les clubs qui ont des parties viennent d'abord.
- **Le niveau n'est jamais un préalable** : cherche et affiche les parties tout de suite, même si le joueur n'a pas de niveau dans son profil. Ne lis son profil que s'il veut trier par niveau.
- Plusieurs clubs dans la même réponse : chaque information ne concerne que son club. Ne prête jamais à un club ce que tu sais d'un autre.

## Afficher : toutes les parties, toujours

- Une puce par partie, dans l'ordre des heures : heure de début et de fin, niveau tel que le club l'indique, places restantes.

> - 9h00 – 10h30 · niveau 4 à 5 · 3 places

- Plusieurs jours : le jour en gras au-dessus de ses parties.
- Le lien du club vient une seule fois, sous la liste : « [Rejoindre une partie](lien) ».
- **Pas d'annonce WhatsApp** quand des parties sont affichées : tout se fait dans l'application du club. Padel Base redirige, c'est tout.

## Le niveau : un tri en plus, jamais un blocage

Par défaut, toutes les parties s'affichent, dans l'ordre des heures, sans tri et sans rien demander avant.

- Le niveau d'une partie est un texte écrit par le club : affiche-le tel quel. Padel Base ne dit pas quelle échelle le club utilise, et **tu ne convertis jamais** d'une échelle à l'autre.
- **Le joueur veut trier** (il donne un niveau ou une tranche dans sa demande, ou demande les parties « de son niveau » et son profil en a un) et les niveaux affichés se lisent comme des nombres de 1 à 8 : mets en premier les parties de sa tranche, puis les autres sur une ligne : « Autres niveaux : 9h00 (5 à 6), 10h30 (6,5 à 7,5) ». Avec un niveau seul, compte une demi-unité de part et d'autre.
- **Les niveaux ne se lisent pas ainsi** (lettres, mots, autre échelle) : pas de tri. Toutes les parties avec les niveaux du club tels quels, puis une ligne : « [Club] indique ses niveaux à sa façon. Pour savoir où vous situer, appelez le club : [téléphone]. »
- **Liste longue (plus de 8 parties) sans tri** : propose une fois, en suggestion de fin : « Dites-moi la tranche de niveau que vous cherchez (par exemple 4 à 5), je trierai les parties pour vous. » La tranche vaut pour la conversation : le profil ne garde qu'un niveau entier.

## Aucune partie à afficher

**La recherche répond normalement, mais sans partie ce jour-là** (le club gère les parties ouvertes dans son application) : « Pas de partie ouverte pour l'instant samedi à [club]. » Puis la recherche de joueurs.

**Les parties de ce club ne se lisent pas** (`not_covered`) : « Je n'ai pas de partie ouverte à vous montrer à [club]. » Puis la recherche de joueurs.

- Ne renvoie jamais vers l'application du club pour y chercher des parties, et ne dis jamais ce que cette application propose ou non.
- Jamais « le club ne publie pas », « non disponible dans le système », ni aucune explication.

## Quand rien ne convient : créer sa partie

Pour chercher des joueurs, il faut d'abord un terrain libre. Propose un créneau libre au même moment dans ce club (format liste de `terrains.md`, deux ou trois puces, avec le lien de réservation), puis :

- **Le club gère les parties ouvertes dans son application** : une ligne pour le réserver en partie ouverte dans l'application, qui trouvera les joueurs. Pas d'annonce par défaut.
- **Sinon** : en suggestion de fin, « Je vous prépare une recherche de joueurs à partager sur WhatsApp ? »

Si le joueur demande explicitement un message pour partager une partie ouverte trouvée, rédige-le sur le modèle du message sur mesure de `annonces-whatsapp.md`.
