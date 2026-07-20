"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytic_controller_1 = require("./analytic.controller");
const router = (0, express_1.Router)();
const controller = new analytic_controller_1.AnalyticController();
// Define routes here
exports.default = router;
//# sourceMappingURL=analytic.routes.js.map