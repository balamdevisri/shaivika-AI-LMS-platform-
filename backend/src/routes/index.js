"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("../modules/users/user.routes"));
const course_routes_1 = __importDefault(require("../modules/courses/course.routes"));
const lesson_routes_1 = __importDefault(require("../modules/lessons/lesson.routes"));
const quiz_routes_1 = __importDefault(require("../modules/quiz/quiz.routes"));
const assignment_routes_1 = __importDefault(require("../modules/assignments/assignment.routes"));
const analytics_routes_1 = __importDefault(require("../modules/analytics/analytics.routes"));
const ai_routes_1 = __importDefault(require("../modules/ai/ai.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/courses', course_routes_1.default);
router.use('/lessons', lesson_routes_1.default);
router.use('/quizzes', quiz_routes_1.default);
router.use('/assignments', assignment_routes_1.default);
router.use('/analytics', analytics_routes_1.default);
router.use('/ai', ai_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map