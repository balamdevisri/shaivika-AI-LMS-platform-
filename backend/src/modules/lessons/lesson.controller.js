"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const lesson_service_1 = require("./lesson.service");
class LessonController {
    lessonService;
    constructor() {
        this.lessonService = new lesson_service_1.LessonService();
    }
}
exports.LessonController = LessonController;
//# sourceMappingURL=lesson.controller.js.map