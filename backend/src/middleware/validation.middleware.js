"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        next(new ApiError_1.ApiError(400, 'Validation Error: ' + error.message));
    }
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validation.middleware.js.map