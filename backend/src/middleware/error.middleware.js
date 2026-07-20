"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const express_1 = require("express");
const logger_1 = __importDefault(require("../config/logger"));
const ApiError_1 = require("../utils/ApiError");
const errorMiddleware = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (!(err instanceof ApiError_1.ApiError)) {
        statusCode = 500;
        message = 'Internal Server Error';
    }
    res.locals.errorMessage = err.message;
    logger_1.default.error(`${'${statusCode}'} - ${'${message}'} - ${'${req.originalUrl}'} - ${'${req.method}'} - ${'${req.ip}'}`);
    res.status(statusCode).json({
        success: false,
        message
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map