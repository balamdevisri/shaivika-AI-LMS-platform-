"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const router = (0, express_1.Router)();
const controller = new course_controller_1.CourseController();
// Define routes here
exports.default = router;
//# sourceMappingURL=course.routes.js.map