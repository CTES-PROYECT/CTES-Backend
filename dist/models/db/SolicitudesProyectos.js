"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const EstadosSolicitudes_1 = __importDefault(require("./EstadosSolicitudes"));
const Proyecto_1 = __importDefault(require("./Proyecto"));
const TipoSolicitudes_1 = __importDefault(require("./TipoSolicitudes"));
const Users_1 = __importDefault(require("./Users"));
const ModelSolicitudesProyectos = connect_1.default.define('SolicitudesProyectos', {
    Comment: {
        type: sequelize_1.DataTypes.STRING
    },
    UserInformador: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Users_1.default,
            key: 'id'
        }
    },
    UserValidador: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Users_1.default,
            key: 'id'
        }
    },
    FkEstadoSolicitud: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: EstadosSolicitudes_1.default,
            key: 'id'
        }
    },
    FkProyecto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Proyecto_1.default,
            key: 'id'
        }
    },
    FkTipoSolicitud: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: TipoSolicitudes_1.default,
            key: 'id'
        }
    }
}, {
    timestamps: false
});
exports.default = ModelSolicitudesProyectos;
//# sourceMappingURL=SolicitudesProyectos.js.map