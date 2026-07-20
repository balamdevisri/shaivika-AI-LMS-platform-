"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const student_service_1 = require("./student.service");
class StudentController {
    studentService;
    constructor() {
        this.studentService = new student_service_1.StudentService();
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map