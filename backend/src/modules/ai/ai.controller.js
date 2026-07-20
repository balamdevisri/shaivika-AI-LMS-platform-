"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const ai_service_1 = require("./ai.service");
const responseFormatter_1 = require("../../utils/responseFormatter");
class AiController {
    aiService = new ai_service_1.AiService();
    chat = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        res.json((0, responseFormatter_1.formatResponse)(true, {}, 'AI Chat template'));
    });
    quiz = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        res.json((0, responseFormatter_1.formatResponse)(true, {}, 'AI Quiz template'));
    });
    assignment = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        res.json((0, responseFormatter_1.formatResponse)(true, {}, 'AI Assignment template'));
    });
    summary = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        res.json((0, responseFormatter_1.formatResponse)(true, {}, 'AI Summary template'));
    });
}
exports.AiController = AiController;
//# sourceMappingURL=ai.controller.js.map