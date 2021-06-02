"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const ModelDateProyecto = connect_1.default.define('DateProyecto', {
    PlazoEjecucion: {
        type: sequelize_1.DataTypes.DATE
    },
    FechaLicitacion: {
        type: sequelize_1.DataTypes.DATE
    },
    FechaInicioObra: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    timestamps: false
});
exports.default = ModelDateProyecto;
//# sourceMappingURL=Roles%20copy%202.js.map