"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesIncludesOneProyect = exports.AttributesIncludesProyectPreview = exports.AttributesExcludesFKProyect = exports.AttributesExcludesProyectPreview = exports.AllClasificacionesArray = exports.ClasificacionConstantes = exports.EstadoProyectosConstantesArray = exports.EstadoProyectosConstantes = exports.TipoSolicitudesConstantes = exports.Roles = void 0;
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
    OPERACIONMANTENIMIENTO: 6,
};
exports.EstadoProyectosConstantesArray = [
    { name: "En evaluación", id: 1 },
    { name: "SEIA", id: 1 },
    { name: "PREINVERSION", id: 2 },
    { name: "Ingeniería", id: 3 },
    { name: "Licitación", id: 4 },
    { name: "Construcción", id: 5 },
    { name: "Operación y Mantenimiento", id: 6 },
    { name: "EIADIA", id: 1 }
];
exports.ClasificacionConstantes = {
    MINERO: 1,
    HIDRAULICO: 2,
    CIVIL: 3,
    ESPACIOSSUBTERRANEOS: 4,
};
exports.AllClasificacionesArray = [
    {
        name: "Cívil",
        id: 3
    },
    {
        name: "Civil",
        id: 3
    },
    {
        name: "Espacios Subterráneos",
        id: 4
    }, {
        name: "Espacios Subterraneos",
        id: 4
    },
    {
        name: "Minero",
        id: 1
    }, {
        name: "Hidráulico",
        id: 2
    },
    {
        name: "Hidraulico",
        id: 2
    }
];
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
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."Longitud" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
        "Longitud",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."Seccion" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
        "Seccion",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."Pendiente" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
        "Pendiente",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."FullName" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
        "NameContratista",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."Email" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
        "EmailContratista",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."NumeroTelefono" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
        "NumeroTelefonoContratista",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "m"."Direccion" FROM "OfIngenieria" AS m WHERE m.id = "Proyectos"."FkOfIngenieria")`),
        "DireccionOfIngenieria",
    ],
    [
        sequelize_1.Sequelize.literal(`(
            SELECT "com"."NameComuna" FROM "OfIngenieria" AS ofcina inner join "Comunas" as com on ofcina."FkComuna"=com."id" WHERE ofcina.id = "Proyectos"."FkOfIngenieria")`),
        "ComunaOfIngenieria",
    ],
];
//# sourceMappingURL=tables.js.map