"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("./quiz.controller");
const router = (0, express_1.Router)();
const controller = new quiz_controller_1.QuizController();
// Define routes here
exports.default = router;
//# sourceMappingURL=quiz.routes.js.map