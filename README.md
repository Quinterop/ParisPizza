**ZENKRI Jihed
SY Alassane**



Pour démarrer,configurer le fichier.env, lancer psql, faire \i bd.sql puis quitter et faire node server.js <<port>> (4545 par défaut)  

**.env:
config .env : PGUSER > nom d'utilisateur PGPASSWORD > mdp psql PGHOST > localhost PGPORT > 5432 par défaut PGDATABASE > nom d'utilisateur**


Dans le navigateur, faire** 127.0.0.1:4545**

Pour accéder au page livreur :** 127.0.0.1:4545/livraison**


<---------------------------------------------------------------->

**répartition des taches :**
Jihed : gestion du serveur, implémentation de la bdd, 1ere instance du panier, livraisons
Alassane : pizza composable, navbar, modals, implémentation menus, carousel, 

**PB rencontrés** : implémentation du panier, lien panier->bdd, sauvegarde de donées entre pages.

erreurs : le choix de traitement des différents types de données (pizzas avec ingrédients, menus...) 
aurait pu etre mieux fait pour un dévloppement plus facile.

**PS** :(si on change le port , faut le changer aussi dans le fichier index.ejs (ligne 55 :onclick="window.location.href='http://127.0.0.1:4545/livraison'))