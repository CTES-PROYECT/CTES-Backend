"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("dc1ri19gkqtfjc", "gcnjzmggywcibo", "68c5870a1a41b5dbf36e0fb6d1e2d47937cfdb73e5efdb48f1a5b485e8f465f4", {
    host: "ec2-3-213-146-52.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    logging: false,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
exports.default = db;
/**
 *
 INSERT INTO "Roles" (name) VALUES('SOCIO');
 INSERT INTO "Roles" (name) VALUES('VALIDADOR');
 INSERT INTO "Roles" (name) VALUES('INFORMADOR');
 INSERT INTO "Roles" (name) VALUES('ADMIN');

 INSERT INTO "EstadoProyecto" ("NameState") VALUES('EIADIA');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('PREINVERSION');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('INGENIERIA');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('LICITACION');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('CONSTRUCCION');
INSERT INTO "EstadoProyecto" ("NameState") VALUES('OPERACION & MANTENIMIENTO');
 
INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('MINERO');
INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('HIDRAULICO');
INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('CIVIL');
INSERT INTO "Clasificacion" ("NameClasificacion") VALUES('ESPACIOS SUBTERRANEOS');


INSERT INTO "TipoSolicitudes" ("NameSolicitudes") Values('Actualizacion');
INSERT INTO "TipoSolicitudes" ("NameSolicitudes") Values('Eliminar');
INSERT INTO "TipoSolicitudes" ("NameSolicitudes") Values('Agregar');


INSERT INTO "EstadosSolicitudes" ("NameEstadoSolicitud") Values('Pendiente');
INSERT INTO "EstadosSolicitudes" ("NameEstadoSolicitud") Values('Aceptado');
INSERT INTO "EstadosSolicitudes" ("NameEstadoSolicitud") Values('Rechazado');


//TRIGGER

create function projectDisparador() returns trigger
as
$$
begin

if new."FkEstadoSolicitud"=2 then
    update "Proyectos" SET "Enabled"=true WHERE id=old."FkProyecto";
else
    update "Proyectos" SET "Enabled"=false WHERE id=old."FkProyecto";
end if;
return new;
End
$$
Language plpgsql

create trigger TR_updateSolicitud after Update on "SolicitudesProyectos"
for each row
execute procedure projectDisparador();

 */
/**
 *
 *
DELETE FROM "Proyectos";
DELETE FROM "Caracteristicas";
DELETE FROM "DateProyecto";
DELETE FROM "Localizacion";


 */ 
//# sourceMappingURL=connect.js.map