"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../../database/connect"));
const ModelRoles = connect_1.default.define('Roles', {
    name: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: false
});
//TODO: NULL is pendig || false is refuse || true is confirmed
exports.default = ModelRoles;
//# sourceMappingURL=Roles%20copy.js.map