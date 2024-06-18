# ASC Angular
Réalisé par Lucas Guerra

## Description
Application web pour la gestion de stock en temps réel


## Technologies Utilisées
- Node.js
- JavaScript
- Express
- dotenv
- Cors
- JSON Web Tokens (jsonwebtoken)
- Sequelize
- PostgreSQL
- bcrypt (pour le chiffrement de mots de passe)
- Nodemon (pour le développement en mode "hot-reloading")
- Angular (pour le développement front)

## Installation

Une fois le dépôt cloné et une fois rendu dans le dossier du projet ne pas oublier d'installer les dépendances pour les deux dossiers

- git clone
- cd ASC-Angular & cd ASC-API
- npm install

## Lancement : 

Pour l'API : 

- npm start  (Mode production)
- npm run dev (Mode développement)

Pour l'Angular : 

- ng serve

## Base de Données

L'application utilise PostgreSQL comme système de gestion de base de données. Assurez-vous d'avoir PostgreSQL installé et configuré correctement sur votre système. 

Avant de lancer l'API, assurez-vous d'avoir une base de données PostgreSQL existante ou créez-en une nouvelle. Configurez les informations de connexion à cette base de données dans votre fichier `.env` en utilisant les variables `DATABASE_URI`. Suivez les instructions de configuration fournies dans la section "Configuration Environnementale" pour connecter correctement l'API à votre base de données PostgreSQL.

## Configuration Environnementale

Pour configurer l'environnement de l'API, avant de lancer le serveur, modifier le fichier `.env` à la racine du projet avec les variables suivantes :

- `SERVER_PORT` : le port sur lequel le serveur va s'exécuter (par exemple, 3000).
- `DATABASE_URI` : informations de connexion à la base de données PostgreSQL.

## Utilisation

- Il est obligatoire d'avoir un compte et de s'authentifier pour utiliser l'application dans son intégralité.

Comment créer un compte ?

- Rendez-vous sur l'url :  [localhost](http://localhost:4200/register)

Comment s'authentifier ? 

- Rendez-vous sur l'url :  [localhost](http://localhost:4200/login)

## Rôles 

Utilisateurs :

- Les utilisateurs peuvent utiliser toute l'application, à l'exception de la gestion des utilisateurs.
  
Administrateurs :

- Les administrateurs ont un accès complet et peuvent gérer les utilisateurs. Pour des raisons de sécurité, il est seulement possible d'obtenir un compte administrateur en attribuant les droits directement via la base de données.

## Contact
Pour plus d'informations, contactez lucas.guerra@ynov.com.
