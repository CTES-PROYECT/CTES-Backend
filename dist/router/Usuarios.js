"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Usuarios_1 = require("../controller/Usuarios");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
// /api/users
router.post("/login", [express_validator_1.body("email").isEmail(), express_validator_1.body("password").notEmpty()], Usuarios_1.logInUser);
router.post("/register", [
    express_validator_1.body("email").isEmail(),
    express_validator_1.body("password").notEmpty(),
    express_validator_1.body("fullName").isString(),
], Usuarios_1.registerUser);
router.put("/update/state", [
    express_validator_1.body("token").isString(),
    express_validator_1.body("idUserPut").notEmpty(),
    express_validator_1.body("condition").isBoolean(),
], Usuarios_1.updateStateUsers);
router.put("/update/rol", [
    express_validator_1.body("token").isString(),
    express_validator_1.body("idUserPut").notEmpty(),
    express_validator_1.body("rol").notEmpty(),
], Usuarios_1.updateRolUser);
exports.default = router;
//# sourceMappingURL=Usuarios.js.map