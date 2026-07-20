"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const quiz_service_1 = require("./quiz.service");
class QuizController {
    quizService;
    constructor() {
        this.quizService = new quiz_service_1.QuizService();
    }
}
exports.QuizController = QuizController;
//# sourceMappingURL=quiz.controller.js.map