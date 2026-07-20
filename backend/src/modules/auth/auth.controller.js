"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const auth_service_1 = require("./auth.service");
class AuthController {
    authService;
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map