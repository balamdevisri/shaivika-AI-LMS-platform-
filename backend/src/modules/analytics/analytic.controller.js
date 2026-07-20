"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const responseFormatter_1 = require("../../utils/responseFormatter");
const analytic_service_1 = require("./analytic.service");
class AnalyticController {
    analyticService;
    constructor() {
        this.analyticService = new analytic_service_1.AnalyticService();
    }
}
exports.AnalyticController = AnalyticController;
//# sourceMappingURL=analytic.controller.js.map