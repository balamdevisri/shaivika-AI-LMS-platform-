"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_controller_1 = require("./lesson.controller");
const router = (0, express_1.Router)();
const controller = new lesson_controller_1.LessonController();
// Define routes here
exports.default = router;
//# sourceMappingURL=lesson.routes.js.map