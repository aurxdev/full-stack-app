# FullStackApp

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Création des tables

Pour créer les tables nécessaires à l'application, exécutez les commandes SQL suivantes :

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    mdp VARCHAR(100),
    isSupport boolean
);
```

```sql
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    categorie VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    etat VARCHAR(50) NOT NULL,
    idUser INTEGER NOT NULL REFERENCES public.users(id),
    idSupport INTEGER NOT NULL
);
```

```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    idTicket INTEGER NOT NULL REFERENCES public.tickets(id) ON DELETE SET NULL,
    contenu TEXT,
    date TIMESTAMP NOT NULL,
    idUser INTEGER NOT NULL REFERENCES public.users(id)
);
```

## Configuration des comptes de base

```sql
-- création d'un admin
INSERT INTO users (nom, mdp, isSupport) VALUES ('admin', '$2b$10$C.sa2/d67q7BOJ9X4Q1SPu4u/qM3VinKz43RQkFf00r1/fcPHGUQy', true);

-- création d'un utilisateur
INSERT INTO users (nom, mdp, isSupport) VALUES ('user', '$2b$10$N10KleNusayMwN/K0W/yw.PgmCMtky8MGc1K7Hia8uLY3900mk9ty', false);
```

## Connexion

#### Compte administrateur
- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `admin`

#### Compte utilisateur
- **Nom d'utilisateur** : `user`
- **Mot de passe** : `user`

## Dépendances

Pour installer toutes les dépendances:

```bash
npm install
```

## Backend

Se placer à la racine du projet, puis : 

```bash
node js/server.js
```

## Frontend

```bash
ng serve
```
