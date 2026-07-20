"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
const assignment_repository_1 = require("./assignment.repository");
class AssignmentService {
    assignmentRepository;
    constructor() {
        this.assignmentRepository = new assignment_repository_1.AssignmentRepository();
    }
}
exports.AssignmentService = AssignmentService;
//# sourceMappingURL=assignment.service.js.map