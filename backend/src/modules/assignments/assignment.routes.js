"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignment_controller_1 = require("./assignment.controller");
const router = (0, express_1.Router)();
const controller = new assignment_controller_1.AssignmentController();
// Define routes here
exports.default = router;
//# sourceMappingURL=assignment.routes.js.map