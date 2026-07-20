"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentRepository = void 0;
const firebase_1 = require("../../firebase");
class AssignmentRepository {
    collection = firebase_1.db.collection('assignments');
}
exports.AssignmentRepository = AssignmentRepository;
//# sourceMappingURL=assignment.repository.js.map