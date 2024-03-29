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
exports.getUserActive = exports.usersPendings = exports.confimedUser = exports.updateRolUser = exports.updateStateUsers = exports.registerUser = exports.logInUser = void 0;
const Users_1 = __importDefault(require("../models/db/Users"));
const validations_1 = require("./utils/validations");
const jwt_1 = require("./utils/jwt");
const sequelize_1 = require("sequelize/");
const msgResponse_1 = require("../constant/msgResponse");
const tables_1 = require("../constant/tables");
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = validations_1.validatorRequest(req);
    if (validation) {
        return res.status(401).json(validation);
    }
    const { email, password } = req.body;
    const usuario = yield Users_1.default.findOne({
        where: { Email: email },
    });
    if (!usuario) {
        return res.status(401).json({
            status: "ERROR",
            msg: "Email invalido",
        });
    }
    const usuariosAtributte = usuario.get();
    const validationPassword = validations_1.comparePassword(password, usuariosAtributte.Password);
    if (validationPassword && usuariosAtributte.EstadoUser === true) {
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.UserAuthCorrectly,
            data: {
                name: usuariosAtributte.FullName,
                token: jwt_1.generateToken(usuariosAtributte.id),
                rol: usuariosAtributte.RolUser,
            },
        });
    }
    if (validationPassword && usuariosAtributte.EstadoUser === null) {
        return res.status(401).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.UserInCheck,
        });
    }
    return res.status(401).json({
        status: "ERROR",
        msg: msgResponse_1.ResponseError.PasswordIncorrectly,
    });
});
exports.logInUser = logInUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = validations_1.validatorRequest(req);
    if (validation) {
        return res.status(400).json(validation);
    }
    const { fullName, password, email } = req.body;
    const existing = yield validations_1.existingUser(email);
    if (existing) {
        return res.status(400).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.EmailExisting,
        });
    }
    try {
        const passwordCrypt = yield validations_1.bcryptPassword(password);
        yield Users_1.default.create({
            FullName: fullName,
            Email: email,
            Password: passwordCrypt,
        });
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.UserCreateCorrectly,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.registerUser = registerUser;
/**
 *
 * @param req { , condition:true o false, idUserPut  }
 * @param res
 */
const updateStateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idUserPut, condition } = req.body;
    const validation = validations_1.validatorRequest(req);
    if (validation) {
        return res.status(400).json(validation);
    }
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.validador);
    if (!premissions) {
        return res.status(401).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.UnauthorizedForUpdate,
        });
    }
    const user = yield validations_1.verifyUserById(idUserPut);
    if (user === false) {
        return res.status(400).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.NotExistId,
        });
    }
    if (user.get().EstadoUser === condition) {
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.NotChangeUser,
        });
    }
    try {
        yield user.update({
            EstadoUser: condition,
        });
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.UpdateUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.updateStateUsers = updateStateUsers;
/**
 *
 * @param req {  idUserPut, rol }
 * @param res
 */
const updateRolUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idUserPut, rol } = req.body;
    const validation = validations_1.validatorRequest(req);
    if (validation) {
        return res.status(400).json(validation);
    }
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.admin);
    if (!premissions) {
        return res.status(401).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.UnauthorizedForUpdate,
        });
    }
    const user = yield validations_1.verifyUserById(idUserPut);
    if (user === false) {
        return res.status(400).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.NotExistId,
        });
    }
    try {
        yield user.update({
            RolUser: rol,
        });
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.UpdateUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.updateRolUser = updateRolUser;
const confimedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    const user = yield Users_1.default.findByPk(idUser);
    if (user) {
        return res.json({
            status: "OK",
            data: {
                fullName: user.get().FullName,
                rol: user.get().RolUser,
            },
        });
    }
    return res.status(401).json({
        status: "ERROR",
        msg: msgResponse_1.ResponseError.Unauthorized,
    });
});
exports.confimedUser = confimedUser;
const usersPendings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.validador);
    if (!premissions) {
        return res.status(401).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.UnauthorizedForRequest,
        });
    }
    try {
        const result = yield Users_1.default.findAll({
            where: {
                EstadoUser: null
            }
        });
        return res.json({
            status: 'OK',
            data: result
        });
    }
    catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            msg: msgResponse_1.ResponseError.ErrorServidor
        });
    }
});
exports.usersPendings = usersPendings;
const getUserActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.admin);
    if (!premissions) {
        return res.status(401).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.UnauthorizedForRequest,
        });
    }
    try {
        const users = yield Users_1.default.findAll({
            where: {
                EstadoUser: {
                    [sequelize_1.Op.eq]: true
                }
            }
        });
        return res.json({
            status: 'OK',
            data: users
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'ERROR',
            msg: msgResponse_1.ResponseError.ErrorServidor
        });
    }
});
exports.getUserActive = getUserActive;
//# sourceMappingURL=Usuarios.js.map