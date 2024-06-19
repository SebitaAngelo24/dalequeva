BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Clasificaciones" (
	"Id"	INTEGER,
	"Titulo"	VARCHAR(100) NOT NULL,
	"Descripcion"	TEXT NOT NULL,
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Peliculas" (
	"Id"	INTEGER,
	"Titulo"	VARCHAR(100) NOT NULL,
	"Director"	VARCHAR(100) NOT NULL,
	"Genero"	VARCHAR(50) NOT NULL,
	"Sinopsis"	TEXT NOT NULL,
	"IdClasificacion"	INTEGER NOT NULL,
	"Duracion"	INTEGER NOT NULL,
	"Eliminado"	BOOLEAN NOT NULL DEFAULT 0,
	FOREIGN KEY("IdClasificacion") REFERENCES "Clasificaciones"("Id"),
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Salas" (
	"Id"	INTEGER,
	"Nombre"	VARCHAR(100) NOT NULL,
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Filas" (
	"Id"	INTEGER,
	"Codigo"	VARCHAR(1) NOT NULL,
	"IdSala"	INTEGER NOT NULL,
	FOREIGN KEY("IdSala") REFERENCES "Salas"("Id"),
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Asientos" (
	"Id"	INTEGER,
	"Numero"	INTEGER NOT NULL,
	"IdFila"	INTEGER NOT NULL,
	FOREIGN KEY("IdFila") REFERENCES "Filas"("Id"),
	PRIMARY KEY("Id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Funciones" (
	"Id"	INTEGER,
	"IdPelicula"	INTEGER NOT NULL,
	"Fecha"	DATE NOT NULL,
	"HoraInicio"	VARCHAR(6) NOT NULL,
	"HoraFin"	VARCHAR(6) NOT NULL,
	"IdSala"	INTEGER NOT NULL,
	"Eliminado"	BOOLEAN NOT NULL DEFAULT 0,
	FOREIGN KEY("IdPelicula") REFERENCES "Peliculas"("Id"),
	FOREIGN KEY("IdSala") REFERENCES "Salas"("Id"),
	PRIMARY KEY("Id" AUTOINCREMENT)
);
INSERT INTO "Clasificaciones" ("Id","Titulo","Descripcion") VALUES (1,'G','Apto para todas las edades');
INSERT INTO "Clasificaciones" ("Id","Titulo","Descripcion") VALUES (2,'PG','Se sugiere la supervisión de los padres');
INSERT INTO "Clasificaciones" ("Id","Titulo","Descripcion") VALUES (3,'PG-13','No recomendado para menores de 13 años sin supervisión de un adulto');
INSERT INTO "Clasificaciones" ("Id","Titulo","Descripcion") VALUES (4,'R','Restringido, menores de 17 años deben ir acompañados de un adulto');
INSERT INTO "Clasificaciones" ("Id","Titulo","Descripcion") VALUES (5,'NC-17','Prohibida para menores de 17 años');
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (1,'Sueño de fuga','Frank Darabont','Drama','Dos hombres encarcelados establecen una estrecha amistad a lo largo de los años, encontrando consuelo y redención a través de actos de decencia común.',1,114,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (2,'El padrino','Francis Ford Coppola','Drama','El patriarca de una dinastía del crimen organizado traslada el control de su imperio clandestino a su renuente hijo.',2,122,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (3,'El caballero de la noche','Christopher Nolan','Acción','Cuando la amenaza conocida como el Joker causa estragos y caos en la gente de Gotham, Batman debe aceptar una de las pruebas psicológicas y físicas más grandes de su capacidad para luchar contra la injusticia.',3,130,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (4,'El señor de los anillos: El retorno del rey','Peter Jackson','Fantasía','Gandalf y Aragorn lideran el Mundo de los Hombres contra el ejército de Sauron para desviar su mirada de Frodo y Sam mientras se acercan a Monte del Destino con el Anillo Único.',4,138,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (5,'Pulp Fiction','Quentin Tarantino','Crimen','Las vidas de dos asesinos a sueldo, un boxeador, un gánster y su esposa, y una pareja de ladrones de restaurantes se entrelazan en cuatro relatos de violencia y redención.',5,146,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (6,'Forrest Gump','Robert Zemeckis','Drama','Las presidencias de Kennedy y Johnson, los eventos de Vietnam, Watergate y otros eventos históricos se desarrollan a través de la perspectiva de un hombre de Alabama con un coeficiente intelectual de 75, cuyo único deseo es reunirse con su amor de la infancia.',1,154,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (7,'Origen','Christopher Nolan','Acción','Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea en la mente de un C.E.O.',2,115,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (8,'Matrix','Lana Wachowski, Lilly Wachowski','Acción','Un hacker informático aprende de misteriosos rebeldes sobre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.',3,123,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (9,'Interestelar','Christopher Nolan','Ciencia ficción','Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',4,131,0);
INSERT INTO "Peliculas" ("Id","Titulo","Director","Genero","Sinopsis","IdClasificacion","Duracion","Eliminado") VALUES (10,'El silencio de los inocentes','Jonathan Demme','Crimen','Un joven cadete del F.B.I. debe recibir la ayuda de un asesino caníbal encarcelado y manipulador para ayudar a capturar a otro asesino en serie.',5,139,0);
INSERT INTO "Salas" ("Id","Nombre") VALUES (1,'Sala 1');
INSERT INTO "Salas" ("Id","Nombre") VALUES (2,'Sala 2');
INSERT INTO "Salas" ("Id","Nombre") VALUES (3,'Sala 3');
INSERT INTO "Salas" ("Id","Nombre") VALUES (4,'Sala 4');
INSERT INTO "Salas" ("Id","Nombre") VALUES (5,'Sala 5');
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (1,'A',1);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (2,'A',2);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (3,'A',3);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (4,'A',4);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (5,'A',5);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (6,'B',1);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (7,'B',2);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (8,'B',3);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (9,'B',4);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (10,'B',5);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (11,'C',1);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (12,'C',2);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (13,'C',3);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (14,'C',4);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (15,'C',5);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (16,'D',1);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (17,'D',2);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (18,'D',3);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (19,'D',4);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (20,'D',5);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (21,'E',1);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (22,'E',2);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (23,'E',3);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (24,'E',4);
INSERT INTO "Filas" ("Id","Codigo","IdSala") VALUES (25,'E',5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (1,1,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (2,1,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (3,1,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (4,1,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (5,1,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (6,1,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (7,1,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (8,1,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (9,1,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (10,1,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (11,1,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (12,1,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (13,1,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (14,1,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (15,1,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (16,1,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (17,1,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (18,1,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (19,1,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (20,1,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (21,1,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (22,1,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (23,1,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (24,1,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (25,1,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (26,2,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (27,2,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (28,2,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (29,2,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (30,2,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (31,2,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (32,2,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (33,2,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (34,2,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (35,2,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (36,2,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (37,2,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (38,2,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (39,2,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (40,2,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (41,2,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (42,2,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (43,2,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (44,2,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (45,2,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (46,2,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (47,2,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (48,2,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (49,2,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (50,2,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (51,3,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (52,3,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (53,3,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (54,3,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (55,3,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (56,3,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (57,3,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (58,3,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (59,3,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (60,3,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (61,3,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (62,3,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (63,3,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (64,3,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (65,3,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (66,3,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (67,3,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (68,3,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (69,3,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (70,3,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (71,3,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (72,3,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (73,3,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (74,3,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (75,3,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (76,4,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (77,4,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (78,4,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (79,4,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (80,4,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (81,4,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (82,4,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (83,4,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (84,4,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (85,4,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (86,4,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (87,4,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (88,4,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (89,4,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (90,4,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (91,4,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (92,4,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (93,4,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (94,4,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (95,4,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (96,4,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (97,4,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (98,4,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (99,4,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (100,4,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (101,5,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (102,5,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (103,5,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (104,5,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (105,5,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (106,5,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (107,5,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (108,5,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (109,5,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (110,5,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (111,5,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (112,5,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (113,5,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (114,5,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (115,5,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (116,5,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (117,5,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (118,5,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (119,5,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (120,5,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (121,5,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (122,5,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (123,5,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (124,5,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (125,5,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (126,6,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (127,6,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (128,6,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (129,6,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (130,6,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (131,6,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (132,6,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (133,6,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (134,6,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (135,6,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (136,6,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (137,6,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (138,6,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (139,6,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (140,6,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (141,6,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (142,6,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (143,6,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (144,6,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (145,6,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (146,6,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (147,6,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (148,6,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (149,6,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (150,6,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (151,7,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (152,7,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (153,7,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (154,7,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (155,7,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (156,7,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (157,7,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (158,7,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (159,7,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (160,7,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (161,7,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (162,7,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (163,7,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (164,7,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (165,7,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (166,7,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (167,7,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (168,7,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (169,7,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (170,7,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (171,7,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (172,7,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (173,7,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (174,7,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (175,7,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (176,8,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (177,8,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (178,8,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (179,8,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (180,8,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (181,8,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (182,8,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (183,8,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (184,8,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (185,8,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (186,8,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (187,8,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (188,8,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (189,8,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (190,8,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (191,8,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (192,8,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (193,8,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (194,8,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (195,8,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (196,8,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (197,8,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (198,8,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (199,8,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (200,8,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (201,9,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (202,9,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (203,9,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (204,9,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (205,9,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (206,9,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (207,9,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (208,9,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (209,9,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (210,9,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (211,9,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (212,9,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (213,9,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (214,9,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (215,9,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (216,9,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (217,9,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (218,9,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (219,9,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (220,9,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (221,9,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (222,9,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (223,9,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (224,9,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (225,9,25);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (226,10,1);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (227,10,2);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (228,10,3);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (229,10,4);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (230,10,5);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (231,10,6);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (232,10,7);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (233,10,8);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (234,10,9);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (235,10,10);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (236,10,11);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (237,10,12);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (238,10,13);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (239,10,14);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (240,10,15);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (241,10,16);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (242,10,17);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (243,10,18);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (244,10,19);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (245,10,20);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (246,10,21);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (247,10,22);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (248,10,23);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (249,10,24);
INSERT INTO "Asientos" ("Id","Numero","IdFila") VALUES (250,10,25);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (1,3,'2023-05-02','20:48','22:30',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (2,3,'2023-05-04','12:56','14:30',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (3,5,'2023-05-02','19:35','21:15',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (4,5,'2023-05-14','19:10','21:00',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (5,2,'2023-05-03','15:00','17:30',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (6,4,'2023-05-07','21:00','23:10',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (7,1,'2023-05-12','17:30','19:50',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (8,6,'2023-05-04','10:00','12:10',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (9,9,'2023-05-10','14:00','15:45',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (10,8,'2023-05-16','18:30','21:10',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (11,7,'2023-05-22','16:20','18:40',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (12,10,'2023-05-08','22:00','23:45',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (13,3,'2023-05-05','17:30','19:20',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (14,5,'2023-05-17','14:10','16:00',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (15,2,'2023-05-10','20:00','22:30',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (16,4,'2023-05-14','13:40','15:50',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (17,1,'2023-05-19','17:30','20:10',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (18,6,'2023-05-12','19:00','21:10',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (19,9,'2023-05-04','12:00','14:20',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (20,8,'2023-05-08','21:30','23:40',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (21,7,'2023-05-15','18:20','20:40',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (22,10,'2023-05-22','14:00','15:45',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (23,3,'2023-05-07','16:30','18:20',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (24,5,'2023-05-12','20:10','22:00',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (25,2,'2023-05-17','15:00','17:30',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (26,4,'2023-05-10','22:00','00:10',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (27,1,'2023-05-05','16:00','18:30',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (28,6,'2023-05-22','19:00','21:10',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (29,9,'2023-05-18','16:00','17:45',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (30,8,'2023-05-24','21:00','23:20',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (31,7,'2023-05-27','19:10','21:30',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (32,10,'2023-05-20','13:30','15:15',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (33,3,'2023-05-09','20:00','21:50',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (34,5,'2023-05-15','14:10','16:00',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (35,2,'2023-05-18','18:00','20:30',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (36,4,'2023-05-23','17:40','19:50',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (37,1,'2023-05-27','18:00','20:40',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (38,6,'2023-05-14','11:30','13:40',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (39,9,'2023-05-08','15:00','16:45',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (40,8,'2023-05-16','20:30','22:50',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (41,7,'2023-05-11','16:20','18:40',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (42,10,'2023-05-05','22:00','23:45',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (43,3,'2023-05-13','17:30','19:20',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (44,5,'2023-05-22','19:10','21:00',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (45,2,'2023-05-27','15:00','17:30',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (46,4,'2023-05-19','21:30','23:40',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (47,1,'2023-05-15','17:30','20:10',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (48,6,'2023-05-09','19:00','21:10',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (49,9,'2023-05-18','12:00','14:20',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (50,8,'2023-05-24','21:30','23:40',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (51,7,'2023-05-27','18:20','20:40',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (52,10,'2023-05-20','14:00','15:45',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (53,3,'2023-05-09','16:30','18:20',4,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (54,5,'2023-05-15','20:10','22:00',1,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (55,2,'2023-05-18','15:00','17:30',2,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (56,4,'2023-05-23','22:00','00:10',3,0);
INSERT INTO "Funciones" ("Id","IdPelicula","Fecha","HoraInicio","HoraFin","IdSala","Eliminado") VALUES (57,1,'2023-05-27','16:00','18:30',4,0);
COMMIT;