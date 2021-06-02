"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = exports.ResponseCorrect = void 0;
exports.ResponseCorrect = {
    UpdateUser: 'Usuario actualizado con exito',
    NotChangeUser: 'el Usuario se encuentra en ese estado',
    UserCreateCorrectly: 'Usuario creado correctamente',
    UserAuthCorrectly: 'Usuario autenticado con exito'
};
exports.ResponseError = {
    UnauthorizedForUpdate: 'Usuario no permitido para modificación',
    NotExistId: 'id del usuario que se desea actualizar es invalido',
    ErrorServidor: 'Error en el servidor, intente mas tarde',
    EmailExisting: 'Email se ecnuentra registrado anteriormente',
    UserInCheck: 'Usuario en revision',
    PasswordIncorrectly: 'Contraseña invalida'
};
//# sourceMappingURL=msgResponse.js.map