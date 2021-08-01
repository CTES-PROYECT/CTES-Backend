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
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("../database/connect"));
const Usuarios_1 = __importDefault(require("../router/Usuarios"));
const ProyectosRouter_1 = __importDefault(require("../router/ProyectosRouter"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.app.use(morgan_1.default("tiny"));
        this.port = process.env.PORT || "51000";
        this.middlewares();
        this.dataBaseConnection();
        this.router();
    }
    dataBaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connect_1.default.authenticate();
                console.log("conectado a la db");
            }
            catch (error) {
                console.log("ERROR EN LA DB\n" + error);
            }
        });
    }
    publicFolder() {
        const publicPath = path_1.default.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor escuchando en puerto: " + this.port);
        });
        this.publicFolder();
    }
    router() {
        this.app.use("/api/users", Usuarios_1.default);
        this.app.use("/api/projects", ProyectosRouter_1.default);
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map