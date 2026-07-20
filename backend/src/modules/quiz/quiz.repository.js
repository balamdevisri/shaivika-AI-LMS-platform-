"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRepository = void 0;
const firebase_1 = require("../../firebase");
class QuizRepository {
    collection = firebase_1.db.collection('quiz');
}
exports.QuizRepository = QuizRepository;
//# sourceMappingURL=quiz.repository.js.map