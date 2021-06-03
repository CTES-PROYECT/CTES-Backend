"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const Regiones_1 = __importDefault(require("./Regiones"));
const ModelComuna = connect_1.default.define("Comunas", {
    NameComuna: {
        type: sequelize_1.DataTypes.STRING,
    },
    FkRegion: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Regiones_1.default,
            key: "id",
        },
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = ModelComuna;
//# sourceMappingURL=Comuna.js.map