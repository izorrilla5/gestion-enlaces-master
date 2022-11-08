
UNLOCK TABLES;

DELETE FROM `enlaces-medicos`.`enlaceTag`;
DELETE FROM `enlaces-medicos`.`listaTag`;
DELETE FROM `enlaces-medicos`.`listaEnlace`;
DELETE FROM `enlaces-medicos`.`lista`;
DELETE FROM `enlaces-medicos`.`voto`;
DELETE FROM `enlaces-medicos`.`enlace`;
DELETE FROM `enlaces-medicos`.`categoria` ;
DELETE FROM `enlaces-medicos`.`tag`;
DELETE FROM `enlaces-medicos`.`usuario`;
DELETE FROM `enlaces-medicos`.`rol`;
DELETE FROM `enlaces-medicos`.`tipo`;
DELETE FROM `enlaces-medicos`.`entidad`;
DELETE FROM `enlaces-medicos`.`campo`;
DELETE FROM `enlaces-medicos`.`idioma`;
DELETE FROM `enlaces-medicos`.`traduccion`;
DELETE FROM `enlaces-medicos`.`provincia`;



insert into `enlaces-medicos`.provincia values 
	 (4,
	 "Almería");

insert into `enlaces-medicos`.provincia values 
	 (11,
	 "Cádiz");
	 
insert into `enlaces-medicos`.provincia values 
	 (14,
	 "Córdoba");

insert into `enlaces-medicos`.provincia values 
	 (18,
	 "Granada");

	insert into `enlaces-medicos`.provincia values 
	 (21,
	 "Huelva");

	insert into `enlaces-medicos`.provincia values 
	 (23,
	 "Jaén");

	insert into `enlaces-medicos`.provincia values 
	 (29,
	 "Málaga");

	insert into `enlaces-medicos`.provincia values 
	 (41,
	 "Sevilla");

	insert into `enlaces-medicos`.provincia values 
	 (22,
	 "Huesca");

	insert into `enlaces-medicos`.provincia values 
	 (44,
	 "Teruel");

	insert into `enlaces-medicos`.provincia values 
	 (50,
	 "Zaragoza");

	insert into `enlaces-medicos`.provincia values 
	 (33,
	 "Asturias");

	 insert into `enlaces-medicos`.provincia values 
	 (7,
	 "Balears, Illes");

	 insert into `enlaces-medicos`.provincia values 
	 (35,
	 "Palmas, Las");

	 insert into `enlaces-medicos`.provincia values 
	 (38,
	 "Santa Cruz de Tenerife");

	 insert into `enlaces-medicos`.provincia values 
	 (39,
	 "Cantabria");

	 insert into `enlaces-medicos`.provincia values 
	 (5,
	 "Ávila");

	 insert into `enlaces-medicos`.provincia values 
	 (9,
	 "Burgos");

	 insert into `enlaces-medicos`.provincia values 
	 (24,
	 "León");

	 insert into `enlaces-medicos`.provincia values 
	 (34,
	 "Palencia");

	 insert into `enlaces-medicos`.provincia values 
	 (37,
	 "Salamanca");

	 insert into `enlaces-medicos`.provincia values 
	 (40,
	 "Segovia");

	 insert into `enlaces-medicos`.provincia values 
	 (42,
	 "Soria");

	 insert into `enlaces-medicos`.provincia values 
	 (47,
	 "Valladolid");

	 insert into `enlaces-medicos`.provincia values 
	 (49,
	 "Zamora");

	 insert into `enlaces-medicos`.provincia values 
	 (2,
	 "Albacete");

	 insert into `enlaces-medicos`.provincia values 
	 (13,
	 "Ciudad Real");

	 insert into `enlaces-medicos`.provincia values 
	 (16,
	 "Cuenca");

	 insert into `enlaces-medicos`.provincia values 
	 (19,
	 "Guadalajara");

	 insert into `enlaces-medicos`.provincia values 
	 (45,
	 "Toledo");

	 insert into `enlaces-medicos`.provincia values 
	 (8,
	 "Barcelona");

	 insert into `enlaces-medicos`.provincia values 
	 (17,
	 "Girona");

	 insert into `enlaces-medicos`.provincia values 
	 (25,
	 "Lleida");

	 insert into `enlaces-medicos`.provincia values 
	 (43,
	 "Tarragona");

	 insert into `enlaces-medicos`.provincia values 
	 (3,
	 "Alicante/Alacant");

	 insert into `enlaces-medicos`.provincia values 
	 (12,
	 "Castellón/Castelló");

	 insert into `enlaces-medicos`.provincia values 
	 (46,
	 "Valencia/València");

	 insert into `enlaces-medicos`.provincia values 
	 (6,
	 "Badajoz");

	 insert into `enlaces-medicos`.provincia values 
	 (10,
	 "Cáceres");

	 insert into `enlaces-medicos`.provincia values 
	 (15,
	 "Coruña, A");

	 insert into `enlaces-medicos`.provincia values 
	 (27,
	 "Lugo");

	 insert into `enlaces-medicos`.provincia values 
	 (32,
	 "Ourense");

	 insert into `enlaces-medicos`.provincia values 
	 (36,
	 "Pontevedra");

	 insert into `enlaces-medicos`.provincia values 
	 (28,
	 "Madrid");

	 insert into `enlaces-medicos`.provincia values 
	 (30,
	 "Murcia");

	 insert into `enlaces-medicos`.provincia values 
	 (31,
	 "Navarra");

	 insert into `enlaces-medicos`.provincia values 
	 (1,
	 "Araba/Álava");

	 insert into `enlaces-medicos`.provincia values 
	 (48,
	 "Bizkaia");

	 insert into `enlaces-medicos`.provincia values 
	 (20,
	 "Gipuzkoa");

	 insert into `enlaces-medicos`.provincia values 
	 (26,
	 "Rioja, La");

	 insert into `enlaces-medicos`.provincia values 
	 (51,
	 "Ceuta");

	 insert into `enlaces-medicos`.provincia values 
	 (52,
	 "Melilla");



LOCK TABLES `enlaces-medicos`.`entidad` WRITE;
ALTER TABLE `enlaces-medicos`.`entidad` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`entidad`(`id`,`nombre`) VALUES (1,'ENLACE');
INSERT INTO `enlaces-medicos`.`entidad`(`id`,`nombre`) VALUES (2,'LISTA');
INSERT INTO `enlaces-medicos`.`entidad`(`id`,`nombre`) VALUES (3,'CATEGORIA');
INSERT INTO `enlaces-medicos`.`entidad`(`id`,`nombre`) VALUES (4,'TAG');
INSERT INTO `enlaces-medicos`.`entidad`(`id`,`nombre`) VALUES (5,'TIPO');
INSERT INTO `enlaces-medicos`.`entidad`(`id`,`nombre`) VALUES (6,'ROL');
INSERT INTO `enlaces-medicos`.`entidad`(`id`,`nombre`) VALUES (7,'IDIOMA');

ALTER TABLE `enlaces-medicos`.`entidad`  ENABLE KEYS;


LOCK TABLES `enlaces-medicos`.`campo` WRITE;
ALTER TABLE `enlaces-medicos`.`campo` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`campo`(`id`,`nombre`) VALUES (1,'nombre');
INSERT INTO `enlaces-medicos`.`campo`(`id`,`nombre`) VALUES (2,'titulo');
INSERT INTO `enlaces-medicos`.`campo`(`id`,`nombre`) VALUES (3,'url');

ALTER TABLE `enlaces-medicos`.`campo`  ENABLE KEYS;

LOCK TABLES `enlaces-medicos`.`idioma` WRITE;
ALTER TABLE `enlaces-medicos`.`idioma` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`idioma`(`id`,`codigo`,`nombre`) VALUES (1,'ES', 'Castellano');
INSERT INTO `enlaces-medicos`.`idioma`(`id`,`codigo`,`nombre`) VALUES (2,'EU', 'Euskara');

ALTER TABLE `enlaces-medicos`.`idioma`  ENABLE KEYS;


/*Creamos roles*/
LOCK TABLES `enlaces-medicos`.`rol` WRITE;
ALTER TABLE `enlaces-medicos`.`rol` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`rol` (`id`,`nombre`) VALUES (1,'Publico');
INSERT INTO `enlaces-medicos`.`rol` (`id`,`nombre`) VALUES (2,'Medico');
INSERT INTO `enlaces-medicos`.`rol` (`id`,`nombre`) VALUES (3,'Administrador');

ALTER TABLE `enlaces-medicos`.`rol`  ENABLE KEYS;

/*Creamos usuarios*/
LOCK TABLES `enlaces-medicos`.`usuario` WRITE;
ALTER TABLE `enlaces-medicos`.`usuario` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`usuario`(`id`,`idRol`,`activo`,`nombre`,`apellidos`,`username`,`email`,`pwd`,`necesitaCambiarContrasena`) VALUES (1,1,true,'Publico','','Publico','Publico','$2b$10$BiH6ULbavXm.oy7WJs3Xz.h1j9iLDXm3oXQo8ivJ30l55c9JOFWeS', 0);
INSERT INTO `enlaces-medicos`.`usuario`(`id`,`idRol`,`activo`,`nombre`,`apellidos`,`username`,`email`,`pwd`,`necesitaCambiarContrasena`) VALUES (2,2,true,'Medico 1','','Medico1','Medico1','$2b$10$BiH6ULbavXm.oy7WJs3Xz.h1j9iLDXm3oXQo8ivJ30l55c9JOFWeS', 0);
INSERT INTO `enlaces-medicos`.`usuario`(`id`,`idRol`,`activo`,`nombre`,`apellidos`,`username`,`email`,`pwd`,`necesitaCambiarContrasena`) VALUES (3,3,true,'Administrador','','Administrador','Administrador','$2b$10$BiH6ULbavXm.oy7WJs3Xz.h1j9iLDXm3oXQo8ivJ30l55c9JOFWeS', 0);
INSERT INTO `enlaces-medicos`.`usuario`(`id`,`idRol`,`activo`,`nombre`,`apellidos`,`username`,`email`,`pwd`,`necesitaCambiarContrasena`) VALUES (4,2,true,'Medico 2','','Medico2','Medico2','$2b$10$BiH6ULbavXm.oy7WJs3Xz.h1j9iLDXm3oXQo8ivJ30l55c9JOFWeS', 0);
INSERT INTO `enlaces-medicos`.`usuario`(`id`,`idRol`,`activo`,`nombre`,`apellidos`,`username`,`email`,`pwd`,`necesitaCambiarContrasena`) VALUES (7,1,true,'Inés','Cardenal','ines.cardenal','ines.cardenal','$2b$10$jCslPaNrHMd005IkY2OIseXlfc4x0zqUGfmQYsiQHfgItkx6MBZjW', 0);
ALTER TABLE `enlaces-medicos`.`usuario`  ENABLE KEYS;

/*Creamos categorias*/
LOCK TABLES `enlaces-medicos`.`categoria` WRITE;
ALTER TABLE `enlaces-medicos`.`categoria` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (1,1,'Bebés');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (2,1,'Digestivo');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (3,1,'Virus');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (4,1,'Respiratorio2');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (5,5,'Niñ@s');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (6,5,'Digestivo');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (7,5,'Virus');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (8,5,'Digestivo');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (9,5,'Accidentes');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (10,1,'Sueño');
INSERT INTO `enlaces-medicos`.`categoria`(`id`,`idCategoriaPadre`,`nombre`) VALUES (11,5,'Síntomas');
ALTER TABLE `enlaces-medicos`.`categoria`  ENABLE KEYS;


/*Creamos tags*/
LOCK TABLES `enlaces-medicos`.`tag` WRITE;
ALTER TABLE `enlaces-medicos`.`tag` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (1,'Cólicos');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (2,'Coronavirus');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (3,'Vómitos');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (4,'Colesterol');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (5,'Prematuros');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (6,'Bronquitis');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (7,'Mitos');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (8,'Fiebre');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (9,'Accidentes');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (10,'Nasal');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (11,'Noche');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (12,'Lactancia');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (13,'Humo');
INSERT INTO `enlaces-medicos`.`tag`(`id`,`nombre`) VALUES (14,'Tabaco');

ALTER TABLE `enlaces-medicos`.`tag`  ENABLE KEYS;



/*Creamos tipos de enlace*/
LOCK TABLES `enlaces-medicos`.`tipo`  WRITE;
ALTER TABLE `enlaces-medicos`.`tipo` DISABLE KEYS;
INSERT INTO `enlaces-medicos`.`tipo` (`id`,`nombre`) VALUES (1, 'WEB');
INSERT INTO `enlaces-medicos`.`tipo` (`id`,`nombre`) VALUES (2, 'Video');
INSERT INTO `enlaces-medicos`.`tipo` (`id`,`nombre`) VALUES (3, 'Audio');
ALTER TABLE `enlaces-medicos`.`tipo`  ENABLE KEYS;

/*Creamos enlaces*/
LOCK TABLES `enlaces-medicos`.`enlace` WRITE;
ALTER TABLE `enlaces-medicos`.`enlace` DISABLE KEYS;


INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(42,'El TDAH en niños, ¡todo lo que debes saber!','https://www.youtube.com/watch?v=Fp5yNeuTK8M',2, 11,'2020-09-10 02:05:08',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(43,'Consejos para afrontar las rabietas de los niños','https://www.youtube.com/watch?v=O3qSdR37Fjc',2, 11,'2020-09-10 02:05:45',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(44,'Claves para tratar a los bebés de alta demanda','https://www.youtube.com/watch?v=rsTnFC6e8Ag',2, 11,'2020-09-10 02:07:08',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(45,'Lavados nasales según la edad del bebé','https://www.youtube.com/watch?v=Ufwwjd19yN0',2, 11,'2020-09-10 02:07:49',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(46,'El catarro o resfriado en niños','https://www.youtube.com/watch?v=9Axq-tcUjKc',2, 11,'2020-09-10 02:11:02',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(47,'El niño con mocos','https://www.youtube.com/watch?v=vEPB8853Qe0',2, 11,'2020-09-10 02:11:47',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(48,'Tiene fiebre, ¿qué hago?','ttps://www.youtube.com/watch?v=G2t7eAt_rbk',2, 11,'2020-09-10 02:12:43',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(49,'La fiebre en niños','https://www.youtube.com/watch?v=fGgKsBnitt0',2, 11,'2020-09-10 02:12:55',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(50,'¿Qué hacer cuando el niño vomita? Consejos','https://www.youtube.com/watch?v=tzLEKa9VIwo',2, 11,'2020-09-10 02:33:55',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(51,'Estreñimiento en niños','https://www.youtube.com/watch?v=QRSjWTtKDJU',2, 11,'2020-09-10 02:16:23',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(52,'Dudas frecuentes durante el primer año del bebé','https://www.youtube.com/watch?v=_cidvnWvlrg',2, 11,'2020-09-10 03:16:03',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(53,'Atragantamientos en niños','https://www.youtube.com/watch?v=hQFH8tPGJf0',2, 11,'2020-09-10 03:16:01',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(54,'Métodos para enseñar a dormir al bebé','ttps://www.youtube.com/watch?v=1yfk-Ln2Rsk',2, 11,'2020-09-10 03:17:02',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(55,'Gastroenteritis en niños','https://www.youtube.com/watch?v=t1w5NJp6mmU',2, 11,'2020-09-10 03:17:06',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(56,'Primeros signos del Trastornos del Espectro Autista','https://www.youtube.com/watch?v=Jkiz0pYqJ4k',2, 11,'2020-09-10 03:18:54',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(57,'La gripe en niños','https://www.youtube.com/watch?v=3Gl6BqgheH4',2, 11,'2020-09-10 03:19:29',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(58,'¿Qué es la bronquiolitis?','https://www.youtube.com/watch?v=XFFMfo_3VN8',2, 11,'2020-09-10 03:20:29',1,3);
INSERT INTO `enlaces-medicos`.`enlace`(`id`,`titulo`,`url`,`idUsuario`,`idCategoria`,`fechaCreacion`,`idEntidad`,`idTipo`) VALUES
(59,'¿Cómo Educar Niños de 0 a 2 años?','https://www.youtube.com/watch?v=_6yZi1adwpA',2, 11,'2020-09-10 03:20:59',1,3);


ALTER TABLE `enlaces-medicos`.`enlace`  ENABLE KEYS;


/*Creamos listas*/

LOCK TABLES `enlaces-medicos`.`lista` WRITE;
ALTER TABLE `enlaces-medicos`.`lista` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`lista` (`id`, `idCategoria`,`idUsuario`, `nombre`) VALUES (1,1,2,'Lista 1');
INSERT INTO `enlaces-medicos`.`lista` (`id`, `idCategoria`,`idUsuario`, `nombre`) VALUES (2,4,2,'Lista 2');
INSERT INTO `enlaces-medicos`.`lista` (`id`, `idCategoria`,`idUsuario`, `nombre`) VALUES (3,3,4,'Lista 3');
INSERT INTO `enlaces-medicos`.`lista` (`id`, `idCategoria`,`idUsuario`, `nombre`) VALUES (4,6,4,'Lista 4');

ALTER TABLE `enlaces-medicos`.`lista`  ENABLE KEYS;

/*Creamos relaciones entre listas y enlaces
LOCK TABLES `enlaces-medicos`.`listaEnlace` WRITE;
ALTER TABLE `enlaces-medicos`.`listaEnlace` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (1,1);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (1,3);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (1,5);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (1,7);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (1,9);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (1,11);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (2,2);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (2,4);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (2,6);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (2,8);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (2,10);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (3,12);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (4,1);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (4,2);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (4,3);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (4,4);
INSERT INTO `enlaces-medicos`.`listaEnlace` (`idLista`,`idEnlace`) VALUES (4,5);

ALTER TABLE `enlaces-medicos`.`listaEnlace`  ENABLE KEYS;
*/
/*Creamos relaciones entre listas y tags*/

LOCK TABLES `enlaces-medicos`.`listaTag` WRITE;
ALTER TABLE `enlaces-medicos`.`listaTag` DISABLE KEYS;
/*
INSERT INTO `enlaces-medicos`.`listaTag`(`idLista`,`idTag`)VALUES(1,1);
INSERT INTO `enlaces-medicos`.`listaTag`(`idLista`,`idTag`)VALUES(2,2);
INSERT INTO `enlaces-medicos`.`listaTag`(`idLista`,`idTag`)VALUES(3,3);
INSERT INTO `enlaces-medicos`.`listaTag`(`idLista`,`idTag`)VALUES(4,4);

INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(1,1);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(2,2);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(3,3);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(4,4);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(1,1);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(2,2);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(3,3);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(4,4);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(1,1);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(2,2);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(3,3);
INSERT INTO `enlaces-medicos`.`listatag`(`idLista`,`idTag`)VALUES(4,4);*/


ALTER TABLE `enlaces-medicos`.`listaTag`  ENABLE KEYS;

/*Creamos relaciones entre enlaces y tags*/

LOCK TABLES `enlaces-medicos`.`enlaceTag` WRITE;
ALTER TABLE `enlaces-medicos`.`enlaceTag` DISABLE KEYS;

INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (42,1);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (43,2);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (44,10);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (45,4);
/*
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (1,12);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (3,3);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (5,6);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (6,9);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (7,11);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (8,8);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (9,7);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (10,13);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (10,14);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (11,6);
INSERT INTO `enlaces-medicos`.`enlaceTag` (`idEnlace`,`idTag`) VALUES (12,4);
*/
ALTER TABLE `enlaces-medicos`.`enlaceTag`  ENABLE KEYS;



UNLOCK TABLES;



LOCK TABLES `enlaces-medicos`.`traduccion` WRITE;
ALTER TABLE `enlaces-medicos`.`traduccion` DISABLE KEYS;


/*Traducción 
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,5,1,1,'WEB');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,5,1,2,'WEB');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,5,1,3,'WEB');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,5,1,1,'Vídeo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,5,1,2,'Bideo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,5,1,3,'Video');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,5,1,1,'Audio');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,5,1,2,'Audioa');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,5,1,3,'Audio');


INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,6,1,1,'Público');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,6,1,2,'Publikoa');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,6,1,3,'Public');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,6,1,1,'Médico');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,6,1,2,'Medikua');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,6,1,3,'Doctor');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,6,1,1,'Administrador');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,6,1,2,'Administratzailea');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,6,1,3,'Administrator');


INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,4,1,1,'Cólicos');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,4,1,2,'Kolikoak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,4,1,3,'Colic');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,4,1,1,'Coronavirus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,4,1,2,'Koronabirusa');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,4,1,3,'Coronavirus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,4,1,1,'Vómitos');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,4,1,2,'Gorakoak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,4,1,3,'Vomits');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (4,4,1,1,'Colesterol');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (4,4,1,2,'Kolesterola');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (4,4,1,3,'Cholesterol');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (5,4,1,1,'Prematuros');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (5,4,1,2,'Goiztiarrak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (5,4,1,3,'Premature baby');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (6,4,1,1,'Bronquitis');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (6,4,1,2,'Bronkitisa');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (6,4,1,3,'Bronchitis');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (7,4,1,1,'Mitos');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (7,4,1,2,'Mitoak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (7,4,1,3,'Myths');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (8,4,1,1,'Fiebre');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (8,4,1,2,'Sukarra');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (8,4,1,3,'Fever');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (9,4,1,1,'Accidentes');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (9,4,1,2,'Istripuak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (9,4,1,3,'Accident');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (10,4,1,1,'Nasal');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (10,4,1,2,'Nasal');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (10,4,1,3,'Nasal');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (11,4,1,1,'Noche');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (11,4,1,2,'Gaua');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (11,4,1,3,'Night');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (12,4,1,1,'Lactancia');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (12,4,1,2,'Edosktzea');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (12,4,1,3,'Lactation');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (13,4,1,1,'Humo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (13,4,1,2,'Kea');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (13,4,1,3,'Smoke');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (14,4,1,1,'Tabaco');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (14,4,1,2,'Tabakoa');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (14,4,1,3,'Tobacco');
*/



INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,3,1,1,'Bebés');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,3,1,2,'Bebés');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (1,3,1,3,'Bebés');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,3,1,1,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,3,1,2,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (2,3,1,3,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,3,1,1,'Virus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,3,1,2,'Virus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (3,3,1,3,'Virus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (4,3,1,1,'Respiratorio');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (4,3,1,2,'Respiratorio');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (4,3,1,3,'Respiratorio');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (5,3,1,1,'Niñ@s');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (5,3,1,2,'Niñ@s');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (5,3,1,3,'Niñ@s');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (6,3,1,1,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (6,3,1,2,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (6,3,1,3,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (7,3,1,1,'Virus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (7,3,1,2,'Virus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (7,3,1,3,'Virus');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (8,3,1,1,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (8,3,1,2,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (8,3,1,3,'Digestivo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (9,3,1,1,'Accidentes');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (9,3,1,2,'Accidentes');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (9,3,1,3,'Accidentes');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (10,3,1,1,'Sueño');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (10,3,1,2,'Sueño');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (10,3,1,3,'Sueño');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (11,3,1,1,'Síntomas');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (11,3,1,2,'Síntomas');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES (11,3,1,3,'Síntomas');


INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(1,1,2,1,'El TDAH en niños, ¡todo lo que debes saber!');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(1,1,2,2,'Zer dira bularreko haurraren kolikoak eta zergatik?');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(1,1,3,1,'Consejos para afrontar las rabietas de los niños');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(1,1,3,2,'https://www.youtube.com/watch?v=p_o-1vRWRA0');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(2,1,2,1,'Cómo afecta el coronavirus a los niños');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(2,1,2,2,'Nola eragiten die koronabirusak haurrei?');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(2,1,3,1,'https://www.univadis.es/viewarticle/comprender-como-afecta-el-coronavirus-a-los-ninos-es-importante-para-frenar-la-pandemia-pediatrics-715674');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(2,1,3,2,'https://www.univadis.es/viewarticle/comprender-como-afecta-el-coronavirus-a-los-ninos-es-importante-para-frenar-la-pandemia-pediatrics-715674');

INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(42,1,2,1,'El TDAH en niños, ¡todo lo que debes saber!');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(42,1,2,2,'El TDAH en niños, ¡todo lo que debes saber! EU');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(42,1,3,1,'https://www.youtube.com/watch?v=Fp5yNeuTK8M');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(42,1,3,2,'https://www.youtube.com/watch?v=Fp5yNeuTK8M');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(43,1,2,1,'Consejos para afrontar las rabietas de los niños');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(43,1,2,2,'Consejos para afrontar las rabietas de los niños');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(43,1,3,1,'https://www.youtube.com/watch?v=O3qSdR37Fjc');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(43,1,3,2,'https://www.youtube.com/watch?v=O3qSdR37Fjc');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(44,1,2,1,'Claves para tratar a los bebés de alta demanda');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(44,1,2,2,'Claves para tratar a los bebés de alta demanda');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(44,1,3,1,'https://www.youtube.com/watch?v=rsTnFC6e8Ag');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(44,1,3,2,'https://www.youtube.com/watch?v=rsTnFC6e8Ag');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(45,1,2,1,'Lavados nasales según la edad del bebé');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(45,1,2,2,'Lavados nasales según la edad del bebé');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(45,1,3,1,'https://player.fm/series/pediatra-para-medicoblastos/7-accidentes-en-la-infancia-primer-intento');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(45,1,3,2,'https://player.fm/series/pediatra-para-medicoblastos/7-accidentes-en-la-infancia-primer-intento');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(46,1,2,1,'Cada bebé tiene su propio ritmo para dormir');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(46,1,2,2,'Haur bakoitzak bere erritmoa du lo egiteko');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(46,1,3,1,'https://www.topdoctors.es/articulos-medicos/cada-bebe-tiene-su-propio-ritmo-para-dormir');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(46,1,3,2,'https://www.topdoctors.es/articulos-medicos/cada-bebe-tiene-su-propio-ritmo-para-dormir');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(47,1,2,1,'Tratar la fiebre en niños, ¿qué hago?');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(47,1,2,2,'Zer egingo dut haurren sukarra tratatzeko?');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(47,1,3,1,'https://www.youtube.com/watch?v=G2t7eAt_rbk');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(47,1,3,2,'https://www.youtube.com/watch?v=G2t7eAt_rbk');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(48,1,2,1,'Mitos y realidades sobre los bebés');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(48,1,2,2,'Haurrei buruzko mitoak eta errealitateak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(48,1,3,1,'http://www.aragonradio.es/podcast/emision/mitos-y-realidades-sobre-los-bebes/');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(48,1,3,2,'http://www.aragonradio.es/podcast/emision/mitos-y-realidades-sobre-los-bebes/');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(49,1,2,1,'La exposición de los menores al humo del tabaco en su casa');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(49,1,2,2,'Adin txikikoak tabakoaren kearen eraginpean egotea etxean');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(49,1,3,1,'http://www.aragonradio.es/podcast/emision/la-exposicion-de-los-menores-al-humo-del-tabaco-en-su-casa/');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(49,1,3,2,'http://www.aragonradio.es/podcast/emision/la-exposicion-de-los-menores-al-humo-del-tabaco-en-su-casa/');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(50,1,2,1,'La bronquiolitis en los niños. Síntomas y tratamiento');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(50,1,2,2,'Bronkiolitisa haurrengan. Sintomak eta tratamendua');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(50,1,3,1,'https://www.youtube.com/watch?v=C6utem9201U');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(50,1,3,2,'https://www.youtube.com/watch?v=C6utem9201U');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(51,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(51,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(51,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(51,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(52,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(52,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(52,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(52,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(53,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(53,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(53,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(53,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(54,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(54,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(54,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(54,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(55,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(55,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(55,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(55,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(56,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(56,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(56,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(56,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(57,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(57,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(57,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(57,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(58,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(58,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(58,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(58,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(59,1,2,1,'Diferencias entre el colesterol bueno y el malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(59,1,2,2,'Kolesterol onaren eta txarraren arteko desberdintasunak');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(59,1,3,1,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');
INSERT INTO `enlaces-medicos`.`traduccion`(`idTabla`,`idEntidad`,`idCampo`,`idIdioma`,`texto`) VALUES(59,1,3,2,'https://www.topdoctors.es/articulos-medicos/diferencias-entre-el-colesterol-bueno-y-el-malo');


ALTER TABLE `enlaces-medicos`.`traduccion`  ENABLE KEYS;


UNLOCK TABLES;



