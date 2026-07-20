"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const admin_service_1 = require("./admin.service");
class AdminController {
    adminService;
    constructor() {
        this.adminService = new admin_service_1.AdminService();
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map