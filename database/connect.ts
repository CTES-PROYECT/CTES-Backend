import { Sequelize } from "sequelize";

const db = new Sequelize("CTES", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});


export default db;


/**
 * 
 INSERT INTO "Roles" (name) VALUES('SOCIO');
 INSERT INTO "Roles" (name) VALUES('VALIDADOR');
 INSERT INTO "Roles" (name) VALUES('INFORMADOR');
 INSERT INTO "Roles" (name) VALUES('ADMIN');
 */

/**
 * INSERT INTO "EstadoProyecto" ("NameState") VALUES('EIADIA');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('PREINVERSION');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('INGENIERIA');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('LICITACION');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('CONSTRUCCION');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('OPERACION & MANTENIMIENTO');
 */

/**
 * INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('MINERO');
INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('HIDRAULICO');
INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('CIVIL');
INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('ESPACIOS SUBTERRANEOS');
 */
/**
DELETE FROM "Proyectos";
DELETE FROM "Caracteristicas";
DELETE FROM "DateProyecto";
DELETE FROM "Localizacion";
 */