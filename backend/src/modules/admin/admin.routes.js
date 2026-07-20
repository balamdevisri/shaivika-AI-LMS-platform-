"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
const controller = new admin_controller_1.AdminController();
// Define routes here
exports.default = router;
//# sourceMappingURL=admin.routes.js.map