"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
const controller = new user_controller_1.UserController();
// Define routes here
exports.default = router;
//# sourceMappingURL=user.routes.js.map