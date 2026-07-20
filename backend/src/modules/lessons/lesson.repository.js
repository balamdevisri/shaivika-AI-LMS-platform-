"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRepository = void 0;
const firebase_1 = require("../../firebase");
class LessonRepository {
    collection = firebase_1.db.collection('lessons');
}
exports.LessonRepository = LessonRepository;
//# sourceMappingURL=lesson.repository.js.map