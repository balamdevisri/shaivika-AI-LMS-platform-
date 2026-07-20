"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("./ai.controller");
const router = (0, express_1.Router)();
const controller = new ai_controller_1.AiController();
router.post('/chat', controller.chat);
router.post('/quiz', controller.quiz);
router.post('/assignment', controller.assignment);
router.post('/summary', controller.summary);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map