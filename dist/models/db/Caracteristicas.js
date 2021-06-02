"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const ModelCaracteristicas = connect_1.default.define('Caracteristicas', {
    Longitud: {
        type: sequelize_1.DataTypes.STRING
    },
    Seccion: {
        type: sequelize_1.DataTypes.STRING
    },
    Pendiente: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: false
});
exports.default = ModelCaracteristicas;
//# sourceMappingURL=Caracteristicas.js.map