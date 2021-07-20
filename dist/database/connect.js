"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("CTES", "postgres", "kevin1183", {
    host: "localhost",
    dialect: "postgres",
    logging: true,
});
exports.default = db;
//# sourceMappingURL=connect.js.map