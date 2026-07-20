"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const course_repository_1 = require("./course.repository");
class CourseService {
    courseRepository;
    constructor() {
        this.courseRepository = new course_repository_1.CourseRepository();
    }
}
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map