"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeIdToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(id) {
    const token = jsonwebtoken_1.default.sign({ id: id }, process.env.PRIVATE_KEY || "PrivateKey", {
        expiresIn: '2d'
    });
    return token;
}
exports.generateToken = generateToken;
function verifyToken(token) {
    try {
        const DecodeToken = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY || "PrivateKey");
        if (DecodeToken.id) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.verifyToken = verifyToken;
function decodeIdToken(token) {
    try {
        const DecodeToken = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY || "PrivateKey");
        if (DecodeToken.id) {
            return DecodeToken.id;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.decodeIdToken = decodeIdToken;
//# sourceMappingURL=jwt.js.map