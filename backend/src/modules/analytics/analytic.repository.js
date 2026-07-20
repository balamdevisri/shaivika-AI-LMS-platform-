"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticRepository = void 0;
const firebase_1 = require("../../firebase");
class AnalyticRepository {
    collection = firebase_1.db.collection('analytics');
}
exports.AnalyticRepository = AnalyticRepository;
//# sourceMappingURL=analytic.repository.js.map