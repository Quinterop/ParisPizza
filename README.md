Projet de site web marchand avec BDD SQL et comptes utilisateurs avec Node, ExpressJS et Bootstrap



Pour démarrer,configurer le fichier.env, lancer psql, faire \i bd.sql puis quitter et faire node server.js port (4545 par défaut)  

**.env:**
config .env : PGUSER > nom d'utilisateur PGPASSWORD > mdp psql PGHOST > localhost PGPORT > 5432 par défaut PGDATABASE > nom d'utilisateur**


Dans le navigateur, faire 127.0.0.1:4545**

Pour accéder au page livreur : 127.0.0.1:4545/livraison


**PS** :(si on change le port , faut le changer aussi dans le fichier index.ejs (ligne 55 :onclick="window.location.href='http://127.0.0.1:4545/livraison'))
