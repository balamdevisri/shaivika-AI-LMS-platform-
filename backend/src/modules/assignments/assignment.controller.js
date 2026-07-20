"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const assignment_service_1 = require("./assignment.service");
class AssignmentController {
    assignmentService;
    constructor() {
        this.assignmentService = new assignment_service_1.AssignmentService();
    }
}
exports.AssignmentController = AssignmentController;
//# sourceMappingURL=assignment.controller.js.map