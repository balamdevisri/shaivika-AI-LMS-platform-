"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticService = void 0;
const analytic_repository_1 = require("./analytic.repository");
class AnalyticService {
    analyticRepository;
    constructor() {
        this.analyticRepository = new analytic_repository_1.AnalyticRepository();
    }
}
exports.AnalyticService = AnalyticService;
//# sourceMappingURL=analytic.service.js.map