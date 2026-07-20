"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const lesson_repository_1 = require("./lesson.repository");
class LessonService {
    lessonRepository;
    constructor() {
        this.lessonRepository = new lesson_repository_1.LessonRepository();
    }
}
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map