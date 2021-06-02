"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const ModelSocio = connect_1.default.define('Socios', {
    NameSocio: {
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        type: sequelize_1.DataTypes.STRING
    },
    NumeroTelefono: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: false
});
//TODO: NULL is pendig || false is refuse || true is confirmed
exports.default = ModelSocio;
//# sourceMappingURL=Socios.js.map