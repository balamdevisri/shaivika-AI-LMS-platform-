"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const firebase_1 = require("../../firebase");
class CourseRepository {
    collection = firebase_1.db.collection('courses');
}
exports.CourseRepository = CourseRepository;
//# sourceMappingURL=course.repository.js.map