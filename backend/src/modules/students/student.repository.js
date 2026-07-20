"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const firebase_1 = require("../../firebase");
class StudentRepository {
    collection = firebase_1.db.collection('students');
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=student.repository.js.map