"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const router = (0, express_1.Router)();
const controller = new student_controller_1.StudentController();
// Define routes here
exports.default = router;
//# sourceMappingURL=student.routes.js.map