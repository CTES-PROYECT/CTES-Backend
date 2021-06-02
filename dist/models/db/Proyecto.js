"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const Caracteristicas_1 = __importDefault(require("./Caracteristicas"));
const Clasificacion_1 = __importDefault(require("./Clasificacion"));
const Contratista_1 = __importDefault(require("./Contratista"));
const DateProyecto_1 = __importDefault(require("./DateProyecto"));
const EstadoProyecto_1 = __importDefault(require("./EstadoProyecto"));
const Localizacion_1 = __importDefault(require("./Localizacion"));
const MetodoConstructivo_1 = __importDefault(require("./MetodoConstructivo"));
const ModelProyecto = connect_1.default.define("Proyectos", {
    NameProyecto: {
        type: sequelize_1.DataTypes.STRING,
    },
    TipoProyecto: {
        type: sequelize_1.DataTypes.STRING,
    },
    TipoContrato: {
        type: sequelize_1.DataTypes.STRING,
    },
    Descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    MontoInversion: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    FkDateProyecto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: DateProyecto_1.default,
            key: "id",
        },
    },
    FkMetodoConstructivo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: MetodoConstructivo_1.default,
            key: "id",
        },
    },
    FkClasificacion: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Clasificacion_1.default,
            key: "id",
        },
    },
    FkEstadoProyecto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: EstadoProyecto_1.default,
            key: "id",
        },
    },
    FkCaracteristicas: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Caracteristicas_1.default,
            key: "id",
        },
    },
    FkLocalizacion: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Localizacion_1.default,
            key: "id",
        },
    },
    FkContratista: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Contratista_1.default,
            key: "id",
        },
    },
}, {
    timestamps: false,
});
exports.default = ModelProyecto;
//# sourceMappingURL=Proyecto.js.map