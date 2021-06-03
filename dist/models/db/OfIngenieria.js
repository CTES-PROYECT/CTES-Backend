"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const Comuna_1 = __importDefault(require("./Comuna"));
const ModelOfIngenieria = connect_1.default.define("OfIngenieria", {
    Direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    FkComuna: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Comuna_1.default,
            key: "id",
        },
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = ModelOfIngenieria;
//# sourceMappingURL=OfIngenieria.js.map