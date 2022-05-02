Op
#8344

Op — Today at 3:06 PM
le modal je voulais l'utiliser pour le bouton commander ou tu mets aussi l'adresse la cb etc
le recapitulatif du panier en gros
avec les boutons + - et tt
jihed zenkri — Today at 3:07 PM
On peut mettre 2 modal
Op — Today at 3:07 PM
on peut limite utiliser nos 2 trucs en fait
jihed zenkri — Today at 3:07 PM
Le + _ c das le panier  cmeux
Op — Today at 3:08 PM
avec le dropdown pour voir ou t'en es et le prix et le modal pour vérifier avant de commander avec tous les boutons et les infos de commande
jihed zenkri — Today at 3:09 PM
Je pense plus simple panier avec tt comme ubereats tas les + -prox total , tu clique  sur commanderr tas un autre modal pour adresse ....
Des je rentre je te montre la mienne
Jai un petit bug
Mais ca marche
Op — Today at 3:10 PM
y'a un truc qu'on doit régler aussi
faut qu'on utilise qu'une version de bootstrap sinon ça fait des bugs
par ex c'est pour ça que sur mon pc les items s'affichent que a gauche
pcq t'es sur bootstrap 3 je crois
mais y'a besoin du 4.1 pour les carousel et d'autres trucs c'est mieux
jihed zenkri — Today at 3:12 PM
Aaaaa ok
Op — Today at 3:12 PM
le truc que t'as envoyé était sur le 3 aussi ça marchait pas sur mon site
jihed zenkri — Today at 3:13 PM
Jai ps fait attention a ca
Jr vais pisher dans une nouvelle branche tt ce que jai fait ( jai changé le design ...)
Et tu testes chez toi
Op — Today at 3:14 PM
okk
jihed zenkri — Today at 3:14 PM
Moi jarr chez moi dans 25mn
On sapp stv
Op — Today at 3:14 PM
chaud
jihed zenkri — Today at 3:14 PM
Azy
Op — Today at 3:46 PM
on peut s'appeler vers 16h30/40 au final ? jsuis sur réseau là
jihed zenkri — Today at 3:52 PM
on fait je taffe dans 1h
du coup j'ai pushé ttt sur la branche 02_panier
teste et dis moi
Op — Today at 4:04 PM
y'a pas de table Entre dans bd.sql
jihed zenkri — Today at 4:04 PM
si
Op — Today at 4:05 PM
ah si t'as raison
mais psql la prend pas
Image
unknown.png
126.83 KB
513x368px
jihed zenkri — Today at 4:05 PM
si si
ah
att
Op — Today at 4:06 PM
c'est ptet a cause des commentaires
jihed zenkri — Today at 4:06 PM
chee moi il la prend
Op — Today at 4:06 PM
bizarre
Image
unknown.png
428.84 KB
951x608px
ça doit etre un pb de version je vais rgarder
jihed zenkri — Today at 4:09 PM
c pas un pb de version
c bon j'ai trouve
Op — Today at 4:11 PM
c'était quoi ?
jihed zenkri — Today at 4:11 PM
yavait un commentaire bizarre
je vais ousher la nouvelle version
du sql
Op — Today at 4:12 PM
envoie le fichier ça ira plus vite
jihed zenkri — Today at 4:12 PM
ok
Op — Today at 4:12 PM
ah j'ai trouvé aussi
le //
jihed zenkri — Today at 4:12 PM
ouii
et ya legumes
aussi
tiens

drop table if exists Entre cascade;
drop table if exists Pizza cascade;
drop table if exists viandes cascade;
drop table if exists commande cascade; 
drop table if exists boisson cascade; 
Expand
message.txt
6 KB
Op — Today at 4:12 PM
bien vu
ça marche
jihed zenkri — Today at 4:14 PM
ca marche le site ?
Op — Today at 4:14 PM
le panier marche
jihed zenkri — Today at 4:15 PM
daccord
Op — Today at 4:15 PM
l'autoscroll et le scrollspy ont l'air de bug
jihed zenkri — Today at 4:15 PM
ouiii  ca je dois regler
le panier ya un petit bug jv regler aussi
Op — Today at 4:15 PM
ah oui le bouton + déconne
jihed zenkri — Today at 4:16 PM
si le nom du poduit est un seul mot ca marche
sinion  ca marche pas
Op — Today at 4:16 PM
bizarre
jihed zenkri — Today at 4:16 PM
un pb de substring en js
je vais le regler
la je vais essayer de mettre composer ta pizza tt seul
Op — Today at 4:16 PM
et pq y'a une textarea a coté du bouton ajouter
jihed zenkri — Today at 4:16 PM
ou ca
Op — Today at 4:17 PM
Image
unknown.png
14.81 KB
757x181px
c'était un menu déroulant avant
jihed zenkri — Today at 4:17 PM
normalment c un nmber
tqt je vais changer ca
Op — Today at 4:17 PM
compose ta pizza le mieux jpense c de mettre des checkboxes dans un modal
jihed zenkri — Today at 4:17 PM
juste commence a faire le modal de ladresse et tt
Op — Today at 4:18 PM
ouais
jihed zenkri — Today at 4:18 PM
checkbox?
Op — Today at 4:18 PM
Image
unknown.png
6.7 KB
117x141px
des trucs du genre
jihed zenkri — Today at 4:19 PM
cpas bien fini le compose ta pizza
Op — Today at 4:19 PM
les boutons font rien chez moi
jihed zenkri — Today at 4:19 PM
les quesls
quels
Op — Today at 4:19 PM
de la pizza a composer
jihed zenkri — Today at 4:19 PM
oui oui j'ai pas fini
Op — Today at 4:20 PM
ok trkl
on va utiliser ma navbar vu qu'elle marche ducoup c mieux
jvais essayer de mélanger nos trucs pr avoir une base pour taffer d'ici ce soir
jihed zenkri — Today at 4:20 PM
nickel okkk
Op — Today at 4:21 PM
qui règle les pb de bootstrap aussi
jte dis quand je push
jihed zenkri — Today at 4:21 PM
fais dans une nouvelle branche
Op — Today at 4:21 PM
yes
jihed zenkri — Today at 4:21 PM
ca marche
vsy bon taf 

drop table if exists Entre cascade;
drop table if exists Pizza cascade;
drop table if exists viandes cascade;
drop table if exists commande cascade; 
drop table if exists boisson cascade; 
drop table if exists sauces cascade; 
drop table if exists livreur cascade; 
drop table if exists fromages cascade; 
drop table if exists legumes cascade; 








create table Entre(
entre_id integer primary key,
entre_name varchar(25) NOT NULL,
entre_prix integer NOT NULL ,
link_img varchar(50)
);
insert into Entre values (1, 'Salade César',7,'img/bread.png');
insert into Entre values (2, 'Croque',3,'img/bread.png');
insert into Entre values (3, 'chicken Wings',3,'img/bread.png');
insert into Entre values (4, 'Omlette',3,'img/bread.png');


/******************************************************************************************************************/
create table Pizza(
Pizza_id integer primary key,
Pizza_name varchar(25) NOT NULL,
Pizza_prix integer NOT NULL ,
Pizza_desc varchar (100) NOT NULL,
link_img varchar(50)
);

                                    /* il faut changer les descriptions */
insert into Pizza values (1, 'Pizza Orientale',11,'Raclette de Savoie, potatoes, bacon, oignons sur une base de crème fraîche légère et mozzarella.
','img/slide1.jpg');
insert into Pizza values (2, 'Pizza Hawaeinne',11,'Raclette de Savoie, potatoes, bacon, oignons sur une base de crème fraîche légère et mozzarella.
','img/slide1.jpg');
insert into Pizza values (3, 'Pizza Parisienne',11,'Raclette de Savoie, potatoes, bacon, oignons sur une base de crème fraîche légère et mozzarella.
','img/slide1.jpg');
insert into Pizza values (4, 'Pizza Curry',11,'Raclette de Savoie, potatoes, bacon, oignons sur une base de crème fraîche légère et mozzarella.
','img/slide1.jpg');



/***********************************************************************************************************************/
create table boisson(
b_id integer primary key,
b_name varchar(25) NOT NULL,
b_prix integer NOT NULL ,
link_img varchar(50)
);


insert into boisson values (1, 'Coca Zero',2,'img/coca.png');
insert into boisson values (2, 'Coca',2,'img/coca.png');
insert into boisson values (3, 'Fanta',2,'img/coca.png');
insert into boisson values (4, 'IceTea',2,'img/coca.png');


/***************************************************************************************/

create table viandes(
    v_id integer primary key,
    v_name varchar(30) NOT NULL,
    v_prix integer NOT NULL ,
    link_img varchar(50) NOT NULL

);



insert into viandes values (1, 'Nugguets',1,'img/nuggets.jpg');
insert into viandes values (2, 'Poulet ',1,'img/poulet.jpg');
insert into viandes values (3, 'Tenders ',1,'img/poulet.jpg');
insert into viandes  values (4, 'Merguez ',1,'img/merguez.jpg');



create table legumes(
    leg_id integer primary key,
    leg_name varchar(30) NOT NULL,
    leg_prix integer NOT NULL ,
    link_img varchar(50) NOT NULL
);



insert into legumes values (1, 'Basilic',1,'img/Basilic.jpg');
insert into legumes values (2, 'Poivron ',1,'img/poivron.jpg');
insert into legumes values (3, ' Piment Rouge',1,'img/piment.jpg');
insert into legumes  values (4, 'Champignons ',1,'img/champ.jpg');


create table sauces(
    sc_id integer primary key,
    sc_name varchar(30) NOT NULL,
    sc_prix integer NOT NULL ,
    link_img varchar(50) NOT NULL

);



insert into sauces values (1, 'Harrissa',1,'harrissa.jpg');
insert into sauces values (2, 'Curry',1,'curry.jpg');
insert into sauces values (3, 'Mayonaise',1,'mayo.jpg');
insert into sauces  values (4, 'Ketchup ',1,'ketchup.jpg');
insert into sauces  values (5, 'Moutard ',1,'moutard.jpg');
insert into sauces  values (6, 'Samourai ',1,'samourai.jpg');
insert into sauces  values (7, 'Chinoise ',1,'chinoise.jpg');


create table fromages(
    f_id integer primary key,
    f_name varchar(30) NOT NULL,
    f_prix integer NOT NULL ,
    link_img varchar(50) NOT NULL

);



insert into fromages values (1, 'parmesan',1,'parmesan.jpg'); 
insert into fromages values (2, 'mozzarella',1,'mozza.jpg'); 
insert into fromages values (3, 'burrata',1,'burrata.jpg');  
insert into fromages values (4, 'roquefort',1,'roquefort.jpg');




/**********************************************************************************************/
/*create table commande ( 
    num integer primary key ,
    nom varchar(20) not NULL, 
    is_delivred NUMBER(1),
    CONSTRAINT ck_testbool_ischk CHECK (is_checked IN (1,0))

    
);

insert into commande values (1, 'jihed',0);
insert into commande values (2, 'asma ',1);*/ 


create table livreur (
    id integer primary key,
    nom varchar(20) not NULL,
    mail varchar(20) not NULL,
    pwd  varchar(20) not NULL
); 

insert into livreur values (1, 'jihed','jihed@gamil.com','jiji123');

/*
creat table commande ( 
    num_cmd varchar(20)  primary key
    
    is_delivred Number(1) , 
    CONSTRAINT ck_testbool_ischk CHECK (is_delivred IN (1,0))


)*/
message.txt
6 KB