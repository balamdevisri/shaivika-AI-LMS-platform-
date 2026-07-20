"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const quiz_repository_1 = require("./quiz.repository");
class QuizService {
    quizRepository;
    constructor() {
        this.quizRepository = new quiz_repository_1.QuizRepository();
    }
}
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map