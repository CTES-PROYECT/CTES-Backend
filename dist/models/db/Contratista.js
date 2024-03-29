"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const ModelContratista = connect_1.default.define("Contratista", {
    FullName: {
        type: sequelize_1.DataTypes.STRING,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
    },
    NumeroTelefono: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = ModelContratista;
//# sourceMappingURL=Contratista.js.map