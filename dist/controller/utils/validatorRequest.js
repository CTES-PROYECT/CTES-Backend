"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorRequest = void 0;
const express_validator_1 = require("express-validator");
const validatorRequest = (req) => {
    const error = express_validator_1.validationResult(req);
    if (!error.isEmpty()) {
        return {
            status: 'Error en peticion',
            error: error.array()
        };
    }
};
exports.validatorRequest = validatorRequest;
//# sourceMappingURL=validatorRequest.js.map