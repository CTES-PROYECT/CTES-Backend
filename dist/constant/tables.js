"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesIncludesOneProyect = exports.AttributesIncludesProyectPreview = exports.AttributesExcludesFKProyect = exports.AttributesExcludesProyectPreview = exports.ClasificacionConstantes = exports.EstadoProyectosConstantes = exports.TipoSolicitudesConstantes = exports.Roles = void 0;
const sequelize_1 = require("sequelize");
exports.Roles = {
    validador: 2,
    socio: 1,
    informador: 3,
    admin: 4,
};
exports.TipoSolicitudesConstantes = {
    Actualizacion: 1,
    Eliminar: 2,
    Observacion: 3,
};
exports.EstadoProyectosConstantes = {
    EIADIA: 1,
    PREINVERSION: 2,
    INGENIERIA: 3,
    LICITACION: 4,
    CONSTRUCCION: 5,
    OPERACION: 6,
    MANTENIMIENTO: 7,
};
exports.ClasificacionConstantes = {
    MINERO: 1,
    HIDRAULICO: 2,
    CIVIL: 3,
    ESPACIOSSUBTERRANEOS: 4,
};
exports.AttributesExcludesProyectPreview = [
    "TipoContrato",
    "TipoProyecto",
    "MontoInversion",
    "FkDateProyecto",
    "FkMetodoConstructivo",
    "FkClasificacion",
    "FkEstadoProyecto",
    "FkCaracteristicas",
    "FkLocalizacion",
    "FkContratista",
    "FkOfIngenieria",
];
exports.AttributesExcludesFKProyect = [
    "FkDateProyecto",
    "FkMetodoConstructivo",
    "FkClasificacion",
    "FkEstadoProyecto",
    "FkCaracteristicas",
    "FkLocalizacion",
    "FkContratista",
    "FkOfIngenieria",
];
exports.AttributesIncludesProyectPreview = [
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "NameState" FROM "EstadoProyecto" AS e WHERE e.id = "Proyectos"."FkEstadoProyecto")`),
        "Estado",
    ],
    [
        sequelize_1.Sequelize.literal(`(
        SELECT "Regiones"."NameRegion"
        FROM "Localizacion" inner join "Regiones" on "Localizacion"."FkRegion" = "Regiones"."id"
        WHERE
             "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
        "Region",
    ],
    [
        sequelize_1.Sequelize.literal(`(
        SELECT "Comunas"."NameComuna"
        FROM "Localizacion" inner join "Comunas" on "Localizacion"."FkComuna" = "Comunas"."id"
        WHERE
             "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
        "Comuna",
    ],
];
exports.AttributesIncludesOneProyect = [
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "NameState" FROM "EstadoProyecto" AS e WHERE e.id = "Proyectos"."FkEstadoProyecto")`),
        "Estado",
    ],
    [
        sequelize_1.Sequelize.literal(`(
        SELECT "Regiones"."NameRegion"
        FROM "Localizacion" inner join "Regiones" on "Localizacion"."FkRegion" = "Regiones"."id"
        WHERE
             "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
        "Region",
    ],
    [
        sequelize_1.Sequelize.literal(`(
        SELECT "Comunas"."NameComuna"
        FROM "Localizacion" inner join "Comunas" on "Localizacion"."FkComuna" = "Comunas"."id"
        WHERE
             "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
        "Comuna",
    ],
    [
        sequelize_1.Sequelize.literal(`(
      SELECT "DateProyecto"."FechaLicitacion"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
        "FechaLicitacion",
    ],
    [
        sequelize_1.Sequelize.literal(`(
      SELECT "DateProyecto"."FechaInicioObras"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
        "FechaInicioObras",
    ],
    [
        sequelize_1.Sequelize.literal(`(
      SELECT "DateProyecto"."PlazoEjecucion"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
        "PlazoEjecucion",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."NameMetodo" FROM "MetodoConstructivo" AS m WHERE m.id = "Proyectos"."FkMetodoConstructivo")`),
        "MetodoConstructivo",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."NameClasificacion" FROM "Clasificacion" AS m WHERE m.id = "Proyectos"."FkClasificacion")`),
        "Clasificacion",
    ],
];
//# sourceMappingURL=tables.js.map