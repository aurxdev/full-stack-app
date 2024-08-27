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


CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    categorie VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    etat VARCHAR(50) NOT NULL,
    statut VARCHAR(50) NOT NULL,
    idUser INTEGER NOT NULL REFERENCES public.users(id),
    idSupport INTEGER NOT NULL
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    idTicket INTEGER NOT NULL REFERENCES public.tickets(id) ON DELETE SET NULL,
    contenu TEXT,
    date TIMESTAMP NOT NULL,
    idUser INTEGER NOT NULL REFERENCES public.users(id)
);

-- création d'un admin
INSERT INTO users (nom, mdp, isSupport) VALUES ('admin', 'admin', true);

-- création d'un utilisateur
INSERT INTO users (nom, mdp, isSupport) VALUES ('user', 'user', false);
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
