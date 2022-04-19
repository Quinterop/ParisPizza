
drop table if exists Entre cascade;
drop table if exists Pizza cascade;
drop table if exists Pizza boisson;
drop table if exists ingred;


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

create table ingred(
    ing_id integer primary key,
    ing_name varchar(30) NOT NULL,
    ing_prix integer NOT NULL 
);



insert into ingred values (1, 'mashrooms',1);
insert into ingred values (2, 'pepperoni ',1);
insert into ingred values (3, 'green peppers ',1);
insert into ingred  values (4, 'red peppers ',1);
insert into ingred values (5,'white sauce ',1);
insert into ingred values (5,'white sauce ',1); 
insert into ingred values (5,'white sauce ',1); 

