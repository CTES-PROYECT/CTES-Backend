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
exports.searchEstadoFK = exports.searchClasificacionFK = exports.searchRegionFK = exports.createSolicitudProyecto = exports.createSocio = exports.createProyecto = exports.createOfIngenieria = exports.createMetodoConstructivo = exports.createOficinasIng = exports.createLocalizacion = exports.createDateProyectFK = exports.createContratista = exports.createContratistaFK = exports.createFkDate = exports.createCaracteristicasFK = void 0;
const sequelize_1 = require("sequelize");
const tables_1 = require("../../../constant/tables");
const Caracteristicas_1 = __importDefault(require("../../../models/db/Caracteristicas"));
const Contratista_1 = __importDefault(require("../../../models/db/Contratista"));
const DateProyecto_1 = __importDefault(require("../../../models/db/DateProyecto"));
const Localizacion_1 = __importDefault(require("../../../models/db/Localizacion"));
const MetodoConstructivo_1 = __importDefault(require("../../../models/db/MetodoConstructivo"));
const OfIngenieria_1 = __importDefault(require("../../../models/db/OfIngenieria"));
const Proyecto_1 = __importDefault(require("../../../models/db/Proyecto"));
const Regiones_1 = __importDefault(require("../../../models/db/Regiones"));
const Socios_1 = __importDefault(require("../../../models/db/Socios"));
const SolicitudesProyectos_1 = __importDefault(require("../../../models/db/SolicitudesProyectos"));
function createCaracteristicasFK(caract) {
    return __awaiter(this, void 0, void 0, function* () {
        const caracteristica = yield Caracteristicas_1.default.create(Object.assign({}, caract));
        return caracteristica.get().id;
    });
}
exports.createCaracteristicasFK = createCaracteristicasFK;
function createFkDate(caract) {
    return __awaiter(this, void 0, void 0, function* () {
        const caracteristica = yield DateProyecto_1.default.create(Object.assign({}, caract));
        return caracteristica.get().id;
    });
}
exports.createFkDate = createFkDate;
const createContratistaFK = (contratista) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield Contratista_1.default.findOne({
        where: {
            FullName: { [sequelize_1.Op.eq]: contratista.FullName },
        },
    });
    if (exist == null) {
        const contra = yield Contratista_1.default.create(contratista);
        return contra.get().id;
    }
    else {
        const { id } = exist.get();
        return id;
    }
});
exports.createContratistaFK = createContratistaFK;
const createContratista = (contratista) => new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield Contratista_1.default.findOne({
        where: {
            FullName: { [sequelize_1.Op.eq]: contratista.FullName },
        },
    });
    if (exist == null) {
        const contra = yield Contratista_1.default.create(contratista);
        resolve(contra.get().id);
    }
    else {
        const { id } = exist.get();
        resolve(id);
    }
}));
exports.createContratista = createContratista;
function createDateProyectFK(dateProject) {
    return __awaiter(this, void 0, void 0, function* () {
        const DateProyecto = yield DateProyecto_1.default.create(Object.assign({}, dateProject));
        return DateProyecto.get().id;
    });
}
exports.createDateProyectFK = createDateProyectFK;
function createLocalizacion(location) {
    return __awaiter(this, void 0, void 0, function* () {
        const loc = yield Localizacion_1.default.create(Object.assign({}, location));
        return loc.get().id;
    });
}
exports.createLocalizacion = createLocalizacion;
function createOficinasIng(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const loc = yield OfIngenieria_1.default.create({
            Direccion: dir,
        });
        return loc.get().id;
    });
}
exports.createOficinasIng = createOficinasIng;
function createMetodoConstructivo(NameMetodo) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield MetodoConstructivo_1.default.findOne({
            where: {
                NameMetodo: NameMetodo.toUpperCase(),
            },
        });
        if (exist) {
            return exist.get().id;
        }
        const metodoConstuctivo = yield MetodoConstructivo_1.default.create({
            NameMetodo: NameMetodo.toUpperCase(),
        });
        return metodoConstuctivo.get().id;
    });
}
exports.createMetodoConstructivo = createMetodoConstructivo;
function createOfIngenieria(Direccion, FkComuna) {
    return __awaiter(this, void 0, void 0, function* () {
        const existe = yield OfIngenieria_1.default.findOne({
            where: {
                Direccion: Direccion,
                FkComuna: FkComuna,
            },
            raw: true,
            lock: true,
        });
        if (existe) {
            return existe.get().id;
        }
        const ofIngenieria = yield OfIngenieria_1.default.create({
            Direccion: Direccion ? Direccion : null,
            FkComuna: FkComuna ? FkComuna : null,
        });
        return ofIngenieria.get().id;
    });
}
exports.createOfIngenieria = createOfIngenieria;
function createProyecto(project) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Proyecto_1.default.create(project);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createProyecto = createProyecto;
function createSocio(socio) {
    return __awaiter(this, void 0, void 0, function* () {
        const sc = yield Socios_1.default.create(Object.assign({}, socio));
        return sc.get().id;
    });
}
exports.createSocio = createSocio;
function createSolicitudProyecto(solicitud) {
    return __awaiter(this, void 0, void 0, function* () {
        const sp = yield SolicitudesProyectos_1.default.create(Object.assign({}, solicitud));
        return sp.get().id;
    });
}
exports.createSolicitudProyecto = createSolicitudProyecto;
function searchRegionFK(region) {
    return __awaiter(this, void 0, void 0, function* () {
        const reg = yield Regiones_1.default.findOne({
            where: {
                NameRegion: { [sequelize_1.Op.like]: `%${region}%` },
            },
        });
        return reg === null || reg === void 0 ? void 0 : reg.get().id;
    });
}
exports.searchRegionFK = searchRegionFK;
function searchClasificacionFK(tipo) {
    return __awaiter(this, void 0, void 0, function* () {
        let id;
        tables_1.AllClasificacionesArray.forEach((c) => {
            if (c.name === tipo) {
                id = c.id;
            }
        });
        return id;
    });
}
exports.searchClasificacionFK = searchClasificacionFK;
function searchEstadoFK(tipo) {
    return __awaiter(this, void 0, void 0, function* () {
        let id;
        tables_1.EstadoProyectosConstantesArray.forEach((c) => {
            if (c.name === tipo) {
                id = c.id;
            }
        });
        return id;
    });
}
exports.searchEstadoFK = searchEstadoFK;
//# sourceMappingURL=CreateFK.js.map