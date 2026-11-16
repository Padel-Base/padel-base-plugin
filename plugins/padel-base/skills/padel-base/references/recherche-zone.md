# Recherche autour d'un lieu

Ces règles s'appliquent aux terrains, aux parties ouvertes et aux tournois, dès que le joueur cherche autour d'une position, d'une ville ou d'un quartier sans citer de club.

## Ce qu'une recherche fait

- **Le lieu.** Il n'y a pas de géocodeur : pour un quartier, une adresse, une petite commune ou « près de chez moi », donne toi-même la latitude et la longitude du lieu. Pour une ville, son nom suffit. Sans lieu ni position : « Dans quelle ville ou quel quartier voulez-vous jouer ? »
- **Les clubs lus.** Une recherche lit les clubs les plus proches du lieu, **5 au plus**, et les renvoie dans `results` : ceux qui ont quelque chose d'abord, puis du plus proche au plus loin, chacun avec sa distance. Terrains et parties : les clubs dont les créneaux se lisent. Tournois : les clubs qui ont des tournois, que leurs créneaux se lisent ou non.
- **Les jours.** Terrains et parties : jusqu'à **3 jours de suite** par recherche (un week-end = 2 jours). Les jours suivants, ou des jours qui ne se suivent pas (« lundi ou jeudi ») : une autre recherche. `from_day` et `to_day` disent ce qui a été couvert. Dans chaque club, seuls les jours où il y a quelque chose apparaissent.
- **Les créneaux.** Chaque club liste 12 créneaux au plus par jour ; `total` compte tous ceux du jour. Un `total` plus grand que la liste : il y en a d'autres, que tu obtiens en cherchant dans ce club seul, ou en resserrant l'heure.
- **Chaque club a son statut** : lu (même sans rien), non lisible pour ce sujet, ou pas lu à l'instant (`failed`). Un club pas lu à l'instant n'est pas un club complet : laisse-le de côté, ne le cite pas dans « Rien à ces horaires à ».
- **`listed_clubs`** (terrains et parties) : des clubs de la zone dont les créneaux ne se lisent pas. Garde-les pour le cas où rien n'est libre : leur téléphone.

## Le rayon

- Par défaut : 30 km. Quand il y a moins de trois clubs lisibles dans ce rayon, la recherche s'élargit toute seule à 50 km ; `radius_km` dit le rayon réellement couvert. S'il vaut 50 sans que le joueur l'ait demandé, dis-le (« En élargissant à 50 km : »).
- N'indique un rayon que si le joueur donne une distance (« à 10 km », « jusqu'à 50 km »). 50 km est le maximum. Un rayon demandé n'est jamais élargi.
- Le rayon ne change pas le nombre de clubs lus : 5 au plus, les plus proches. Pour voir d'autres clubs, déplace le centre (ci-dessous).

## Au moins 5 clubs qui ont de la place

Dès que le joueur cherche autour d'un lieu ou dans une zone sans citer de club, le but est de lui proposer **5 clubs qui ont ce qu'il demande**, pour qu'il choisisse selon la distance et l'horaire. Un seul club proposé alors que d'autres avaient de la place est une erreur.

1. Lance la recherche autour du lieu, pour les jours demandés. Ne t'arrête jamais au premier club qui a de la place.
2. Moins de 5 clubs avec de la place : continue avec des recherches autour de villes voisines, à une vingtaine de kilomètres au nord, au sud, à l'est et à l'ouest du lieu. Chaque recherche lit les 5 clubs les plus proches de son centre : c'est ainsi que tu atteins d'autres clubs. Fusionne sans doublon (un même club revient dans plusieurs recherches).
3. Arrête-toi dès que tu as 5 clubs avec de la place, ou quand la zone est couverte (50 km autour du lieu, ou toute la région demandée).
4. Toujours moins de 5 après ça : propose ce que tu as trouvé, puis la prochaine date où d'autres clubs ont de la place (voir « Rien dans la zone »).

- Les distances renvoyées partent du centre de chaque recherche. Pour une recherche déplacée, n'affiche pas cette distance comme une distance depuis le joueur : indique la ville du club à la place.
- Ne s'applique pas quand le joueur cite un club : on cherche dans ce club, la zone ne sert qu'aux alternatives.

## Grande zone (département, région)

- « En Île-de-France », « dans le Var », « en Gironde » : une seule recherche ne couvre pas la zone. Lance plusieurs recherches autour de villes réparties sur la zone (leur nom, ou leur latitude et longitude), puis fusionne les clubs sans doublon. Ne demande pas au joueur de préciser avant de chercher.
- Île-de-France : Paris, Saint-Denis, Cergy, Versailles, Évry-Courcouronnes, Melun, Marne-la-Vallée. Ailleurs, choisis de la même façon le chef-lieu et les grandes villes du département ou de la région.
- Position du joueur connue : distances depuis lui. Sinon : distances depuis la ville principale de la zone (Paris pour l'Île-de-France), et indique la ville de chaque club.

## Quand chercher par zone

- Le joueur cite un lieu, ou ne cite ni club ni lieu : recherche par zone, autour du lieu cité ou de sa position approximative.
- Le joueur cite un club : cherche dans ce club. Utilise la zone autour de ce club seulement pour les alternatives (même horaire ailleurs quand c'est pris, club absent de Padel Base, club sans ce que le joueur cherche). Quand un club est inconnu ou que ses créneaux ne se lisent pas, Padel Base joint déjà jusqu'à trois clubs proches (`nearby`) : pars de ceux-là.
- Lieu inconnu et position inconnue : « Dans quelle ville ou quel quartier voulez-vous jouer ? »

## Noms ambigus

Un nom qui correspond à plusieurs clubs (« Padel », « Padel Club ») : voir `trouver-club.md`. Padel Base propose trois clubs au plus, ou demande la ville. Ne liste jamais tous les clubs de Padel Base qui contiennent un mot.

## Un seul club avec de la place, après avoir couvert toute la zone

Réponds exactement comme pour une recherche dans ce club. Ne parle pas de la zone.

## Plusieurs clubs dans la zone

- **Cinq clubs** qui ont ce que le joueur cherche, du plus proche au plus loin. À distance comparable, celui qui colle le mieux à l'heure et à la durée demandées passe devant (un créneau à 18h00 avant un créneau à 20h00 s'il a demandé 18h00).
- Un club sans résultat n'apparaît pas dans la liste. Au-delà de cinq clubs avec de la place, une dernière ligne nomme les suivants : « Aussi de la place à : Club (ville), Club (ville). »
- **Clubs plus proches sans créneau** : si des clubs interrogés plus proches que certains clubs proposés n'ont rien, nomme-les en une ligne, pour que le joueur sache qu'ils ont été regardés : « Rien à ces horaires à : Padel 15, 4Padel Saint-Denis, 4Padel Montreuil. » Quatre noms au plus, les plus proches. Jamais d'explication sur pourquoi c'est complet.

Chaque club de `results` porte son propre lien de réservation. Club sans lien : sa puce porte son téléphone cliquable à la place du lien (`Appeler : [01 46 87 64 24](tel:+33146876424)`).

### Demande précise (une heure, un créneau)

Une puce par club, avec la distance, le créneau le plus proche de la demande et son lien :

> Jeudi vers 19h00 autour d'Alfortville 🎾
>
> - **Play Padel** (2 km) · 18h30 – 20h00 · [Réserver](https://go.padel-base.fr/play-padel)
> - **Coquelicot Padel** (9 km) · 19h00 – 20h30 · [Réserver](https://go.padel-base.fr/coquelicot-padel)
> - **Carré Padel** (24 km) · 19h30 – 21h30 · [Réserver](https://go.padel-base.fr/carre-padel)

### Plusieurs jours au choix (« lundi ou mardi soir »)

Une puce par club, avec pour chaque jour le premier créneau à partir de l'heure demandée, puis son lien ou son téléphone :

> Lundi ou mardi soir en Île-de-France 🎾
>
> - **Play Padel** (Alfortville, 10 km) · lun. 18h00 – 20h00 · mar. 18h00 – 19h30 · [Réserver](https://go.padel-base.fr/play-padel)
> - **ASTC Hauts-de-Seine** (Nanterre, 11 km) · lun. 20h00 – 21h30 · Appeler : [01 47 24 67 67](tel:+33147246767)
> - **Stadium Thiais** (Thiais, 12 km) · lun. 18h00 – 19h30 · mar. 18h00 – 19h30 · Appeler : [01 46 87 64 24](tel:+33146876424)
> - **La Châtaigneraie** (Rueil-Malmaison, 13 km) · lun. 18h30 – 20h00 · mar. 20h00 – 21h30 · Appeler : [01 47 51 66 72](tel:+33147516672)
> - **Stade de la Marche** (Marnes-la-Coquette, 14 km) · mar. 19h00 – 20h30 · Appeler : [01 47 41 13 68](tel:+33147411368)
>
> Rien à ces horaires à : Padel 15, 4Padel Saint-Denis, 4Padel Montreuil, 4Padel La Courneuve.

### Demande large (une journée, un week-end)

Détaille le club le plus proche avec le format habituel de `terrains.md`, **son lien juste dessous**, puis une puce par club suivant avec les moments où il reste de la place :

> **Play Padel** (2 km) · samedi 7/11
> *(créneaux au format habituel)*
>
> [Réserver mon terrain](https://go.padel-base.fr/play-padel)
>
> Aussi de la place samedi :
> - **Coquelicot Padel** (9 km) : matin, soir
> - **Carré Padel** (24 km) : après-midi, soir
>
> Je vous détaille un autre club, ou je vous prépare l'annonce pour un créneau ?

La limite de 12 lignes de créneaux s'applique à l'ensemble de la réponse. Si elle est dépassée, ne garde pour le club détaillé que le bloc de la durée qui a le plus de créneaux, et ajoute « Aussi des créneaux de 1h30 (ou 2h), demandez-les si besoin. »

### Club cité, mais l'heure est prise

D'abord le club cité : la ligne « 19h00 est déjà pris », ses créneaux les plus proches, **son lien**. Puis, en dessous, le même horaire dans les clubs proches, une puce par club avec son propre lien.

## Rien dans la zone

Ne laisse jamais le joueur sans proposition. Cherche la **prochaine date** où il y a de la place à l'horaire ou au moment demandé (le joueur change plus facilement de jour que de lieu) : relance la même recherche sur les jours suivants, trois par trois, jusqu'à 7 jours, et propose-la directement avec ses créneaux. En suggestion de fin, propose d'élargir la zone si le rayon couvert n'était pas déjà de 50 km.

Aucun club lisible dans la zone : donne le téléphone des clubs de `listed_clubs`, pour que le joueur appelle. Aucun club du tout : dis qu'aucun club n'est encore sur Padel Base dans ce secteur, et demande une autre ville.

> Rien de libre samedi soir autour d'Alfortville. Dimanche soir, il reste :
> - **Play Padel** (2 km) · 19h00 – 21h00 · [Réserver](https://go.padel-base.fr/play-padel)
> - **Coquelicot Padel** (9 km) · 20h00 – 21h30 · [Réserver](https://go.padel-base.fr/coquelicot-padel)
>
> Je peux aussi chercher samedi jusqu'à 50 km, si vous voulez.
