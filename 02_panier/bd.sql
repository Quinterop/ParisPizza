
drop table if exists Entre cascade;
drop table if exists Pizza cascade;
drop table if exists viandes cascade;
drop table if exists commande cascade; 
drop table if exists boisson cascade; 
drop table if exists sauces cascade; 
drop table if exists livreur cascade; 
drop table if exists fromages cascade; 
//* table pour panier*/







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
','img/slide1.png');
insert into Pizza values (2, 'Pizza Hawaeinne',11,'Raclette de Savoie, potatoes, bacon, oignons sur une base de crème fraîche légère et mozzarella.
','img/slide2.png');
insert into Pizza values (3, 'Pizza Parisienne',11,'Raclette de Savoie, potatoes, bacon, oignons sur une base de crème fraîche légère et mozzarella.
','img/slide3.png');
insert into Pizza values (4, 'Pizza Curry',11,'Raclette de Savoie, potatoes, bacon, oignons sur une base de crème fraîche légère et mozzarella.
','img/slide4.png');



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