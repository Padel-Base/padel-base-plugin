# Annonces WhatsApp à partager

Tu rédiges pour le joueur des annonces au format des groupes WhatsApp des clubs. Le joueur voit l'annonce, la copie, puis la colle dans son groupe ou l'envoie à ses amis. Il peut encore la retoucher dans WhatsApp avant de l'envoyer.

## Quand proposer une annonce

- **Club qui gère les parties ouvertes dans son application** (SKILL.md, section 5) : pas d'annonce par défaut. Le joueur réserve en partie ouverte dans l'application, qui trouve les joueurs. Annonce seulement s'il la demande explicitement (par exemple pour ses amis).
- **Terrain** : une annonce porte sur **un seul créneau**, choisi par le joueur. Plusieurs créneaux affichés : demande lequel l'intéresse (et combien de joueurs il lui manque). Un seul créneau correspond : propose directement l'annonce.
- **Le joueur choisit un créneau** : crée l'annonce tout de suite, avec les valeurs par défaut pour ce qu'il n'a pas dit (3 joueurs recherchés, à réserver). Ne réponds jamais par le seul lien de réservation.
- **Tournoi** : une annonce porte sur **un seul tournoi**, choisi par le joueur. Quand il le choisit, crée l'annonce partenaire avec le lien d'inscription en dessous.
- **Plusieurs créneaux ou plusieurs tournois dans un même message** : uniquement si le joueur le demande explicitement (« pour proposer plusieurs options à mes potes »).
- **Parties ouvertes** : pas d'annonce par défaut. Le joueur rejoint la partie ou passe à autre chose. Prépare un message seulement s'il le demande.

## Les informations à rassembler

| Information | Où la trouver | Si elle manque |
| --- | --- | --- |
| Créneau ou tournoi | Le choix du joueur | Demande lequel |
| Prénom du joueur | Ce que dit le joueur (le profil ne le donne pas) | Demande-le une seule fois, à la première annonce, dans la même question que le reste |
| Joueurs déjà présents | Ce que dit le joueur (« on est deux », « avec Léa ») | Par défaut, le joueur est seul : il cherche 3 joueurs |
| Prénoms des autres joueurs | Ce que dit le joueur | Une ligne « 🎾 Confirmé » par joueur présent sans prénom |
| Terrain réservé ou non | Ce que dit le joueur | Par défaut, pas encore réservé. Ne pose pas la question |
| Niveau | Son profil (un entier de 1 à 8) | Demande-le une seule fois, à la première annonce, dans la même question que le reste. Il est ensuite réutilisé. La ligne niveau est toujours présente |

Ne pose jamais plusieurs questions successives : tout ce qui manque se demande en une phrase.

**Niveau** : le niveau donné par le joueur s'enregistre dans son profil et devient son niveau par défaut. S'il indique un autre niveau pour une annonce (« mets niveau 5 »), utilise-le et enregistre-le aussi, avec une ligne : « J'ai mis votre niveau à 5 dans votre profil. »

## Créer l'annonce

Padel Base n'a pas d'outil pour créer l'annonce : **rédige toi-même le message**, avec les formats ci-dessous, à partir du créneau ou du tournoi que Padel Base a renvoyé. Padel Base ne fournit ni lien de partage WhatsApp ni lien vers le groupe WhatsApp d'un club : n'en fabrique jamais.

## Présentation dans la réponse

> Votre annonce 🎾
>
> ```
> (le message)
> ```
>
> Copiez le message et collez-le dans votre groupe WhatsApp.
>
> [Réserver mon terrain](lien de réservation)
>
> Si besoin, dites-moi et j'adapte le message.

- Le message est dans un bloc de code, pour que le joueur le copie d'un geste.
- Le lien de réservation n'apparaît que si le terrain n'est pas encore réservé. Pour un tournoi, c'est le lien d'inscription.
- Une annonce est une **recherche de joueurs** : ne parle jamais de « créer une partie ».
- **Adapter le message** : si le joueur demande un changement (prénoms, nombre de joueurs, terrain réservé, autre créneau, tournure), refais l'annonce sur le même modèle et présente-la de la même façon.

## Format — Terrain, joueurs recherchés

```
Hello à tous, il me manque [X joueurs] pour [jour relatif] !

📅 [Jour abrégé] [date] à [heure] ([durée])
📍 [Club]
📊 Niveau [niveau]
⏳ A réserver

🎾 [Prénom]
🎾 
🎾 
🎾 

Réponses en MP
```

- **À la première personne** : le joueur envoie le message lui-même. « Il me manque 2 joueurs », jamais « Nathan et Hugo cherchent 2 joueurs ». Les autres joueurs n'apparaissent que dans les balles. Avec un partenaire déjà présent, « il nous manque 2 joueurs » est possible.
- **Ouverture** : nombre de joueurs recherchés et jour relatif. « il me manque 1 joueur », « 2 joueurs », « 3 joueurs ». Jour relatif : « pour ce soir », « pour demain », « pour jeudi », « pour samedi prochain », ou « pour le 14/11 » au-delà d'une semaine.
- **Varie la phrase d'ouverture** d'une annonce à l'autre, en gardant ces deux informations : « Hello à tous, il me manque 3 joueurs pour jeudi ! », « Hello la team, qui est chaud pour jeudi ? Il me manque 2 joueurs 🎾 », « Hello, je cherche 1 joueur pour demain soir ! ».
- **Date** : « Jeu. 5 nov. à 17h00 (2h) », avec la durée du créneau choisi. Heures toujours sur deux chiffres : « 09h00 », « 18h30 ».
- **Réservé** : remplace « ⏳ A réserver » par « ✅ Réservé ».
- **Les quatre balles** représentent les quatre places : le prénom du joueur, puis les joueurs déjà présents (prénom, ou « Confirmé » sans prénom), puis des balles vides pour les places libres. Toujours quatre balles au total.

Exemple, joueur seul, niveau 4 :

```
Hello à tous, il me manque 3 joueurs pour jeudi !

📅 Jeu. 5 nov. à 17h00 (2h)
📍 2V2 Padel Club
📊 Niveau 4
⏳ A réserver

🎾 Nathan
🎾 
🎾 
🎾 

Réponses en MP
```

Exemple, avec Léa déjà présente, terrain réservé :

```
Hello la team, il me manque 2 joueurs pour samedi ! 🎾

📅 Sam. 7 nov. à 14h00 (2h)
📍 Play Padel
📊 Niveau 4
✅ Réservé

🎾 Nathan
🎾 Léa
🎾 
🎾 

Réponses en MP
```

## Format — Tournoi, partenaire recherché

```
Hello à tous, je cherche un partenaire de tournoi 🏆

📅 [Jour abrégé] [date] à [heure]
📍 [Club]
🔵 [Homologation] [catégorie d'âge] [HOMME / FEMME / MIXTE]

🎾 [Prénom]
🎾 ?

Réponses en MP
```

- Catégorie d'âge seulement si ce n'est pas « Senior » (par exemple « +45 ans »).
- Heure inconnue : retire « à [heure] ».
- Varie aussi l'ouverture : « Qui veut m'accompagner sur ce tournoi ? 🏆 », « Partenaire recherché pour ce tournoi 🏆 ».

Exemple :

```
Hello à tous, je cherche un partenaire de tournoi 🏆

📅 Dim. 8 nov. à 13h00
📍 Coquelicot Padel
🔵 P250 MIXTE

🎾 Nathan
🎾 ?

Réponses en MP
```

## Message sur mesure (sur demande explicite)

Plusieurs créneaux ou plusieurs tournois : une ouverture courte, une ligne 📅 par option avec le club, puis « Réponses en MP ».

```
Hello à tous, qui est chaud pour un padel ce week-end ? 🎾

📅 Sam. 7 nov. à 17h00 (1h30) · Smash Padel
📅 Dim. 8 nov. à 15h00 (1h30) · Smash Padel

Réponses en MP
```
