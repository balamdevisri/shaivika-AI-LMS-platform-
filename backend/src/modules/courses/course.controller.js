"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const course_service_1 = require("./course.service");
class CourseController {
    courseService;
    constructor() {
        this.courseService = new course_service_1.CourseService();
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map