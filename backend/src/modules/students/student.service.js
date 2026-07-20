"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const student_repository_1 = require("./student.repository");
class StudentService {
    studentRepository;
    constructor() {
        this.studentRepository = new student_repository_1.StudentRepository();
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map