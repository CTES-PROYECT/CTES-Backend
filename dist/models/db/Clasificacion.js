"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const ModelClasificacion = connect_1.default.define("Clasificacion", {
    NameClasificacion: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = ModelClasificacion;
//# sourceMappingURL=Clasificacion.js.map