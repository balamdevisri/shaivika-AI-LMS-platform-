"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const user_service_1 = require("./user.service");
class UserController {
    userService;
    constructor() {
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map