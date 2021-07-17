"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBearerToken = exports.verifyUserById = exports.validatePermissionsForId = exports.validatePermissionsForToken = exports.bcryptPassword = exports.comparePassword = exports.userLoginValidation = exports.existingUser = exports.validatorRequest = void 0;
const express_validator_1 = require("express-validator");
const Users_1 = __importDefault(require("../../models/db/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("./jwt");
const validatorRequest = (req) => {
    const error = express_validator_1.validationResult(req);
    if (!error.isEmpty()) {
        return {
            status: "Error en peticion",
            error: error.array(),
        };
    }
};
exports.validatorRequest = validatorRequest;
const existingUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Users_1.default.findOne({
        where: { Email: email },
    });
    if (usuario) {
        return true;
    }
    return false;
});
exports.existingUser = existingUser;
const userLoginValidation = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Users_1.default.findOne({
        where: { Email: email },
    });
    if (!usuario) {
        return false;
    }
    const usuariosAtributte = usuario.get();
    const validation = yield comparePassword(password, usuariosAtributte.Password);
    if (validation) {
        return true;
    }
    return false;
});
exports.userLoginValidation = userLoginValidation;
function comparePassword(password, hash) {
    return bcrypt_1.default.compareSync(password, hash);
}
exports.comparePassword = comparePassword;
function bcryptPassword(password) {
    const salt = 10;
    return bcrypt_1.default.hash(password, salt);
}
exports.bcryptPassword = bcryptPassword;
function validatePermissionsForToken(token, fk) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = jwt_1.decodeIdToken(token);
        if (id === false) {
            return false;
        }
        const usuario = yield Users_1.default.findByPk(id);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.get().RolUser) === fk) {
            return true;
        }
        return false;
    });
}
exports.validatePermissionsForToken = validatePermissionsForToken;
function validatePermissionsForId(id, fk) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield Users_1.default.findByPk(id);
        if ((usuario === null || usuario === void 0 ? void 0 : usuario.get().RolUser) === fk) {
            return true;
        }
        return false;
    });
}
exports.validatePermissionsForId = validatePermissionsForId;
function verifyUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Users_1.default.findByPk(id);
            if (user === null) {
                return false;
            }
            return user;
        }
        catch (error) {
            return false;
        }
    });
}
exports.verifyUserById = verifyUserById;
const stringBearer = "Bearer";
function verifyBearerToken(autorization) {
    if (!autorization) {
        return {
            validation: false,
        };
    }
    const arrayAuth = autorization.split(" ");
    if (arrayAuth.length > 2 || arrayAuth.length <= 1) {
        return {
            validation: false,
        };
    }
    if (arrayAuth[0] === stringBearer) {
        if (arrayAuth[1]) {
            const id = jwt_1.verifyToken(arrayAuth[1]);
            if (!id) {
                return {
                    validation: false,
                };
            }
            return {
                validation: true,
                id: id,
            };
        }
    }
    return {
        validation: false,
    };
}
exports.verifyBearerToken = verifyBearerToken;
//# sourceMappingURL=validations.js.map