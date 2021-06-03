"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const Roles_1 = __importDefault(require("./Roles"));
const Socios_1 = __importDefault(require("./Socios"));
const ModelUsers = connect_1.default.define("Users", {
    FullName: {
        type: sequelize_1.DataTypes.STRING,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
    },
    EstadoUser: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: null,
    },
    RolUser: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: Roles_1.default,
            key: "id",
        },
    },
    FkSocio: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null,
        references: {
            model: Socios_1.default,
            key: "id",
        },
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
//TODO: NULL is pendig || false is refuse || true is confirmed
exports.default = ModelUsers;
//# sourceMappingURL=Users.js.map