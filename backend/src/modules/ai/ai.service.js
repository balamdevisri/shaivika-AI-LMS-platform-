"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const gemini_service_1 = require("./gemini.service");
const promptManager_1 = require("./prompts/promptManager");
const knowledgeRetrieval_1 = require("./retrieval/knowledgeRetrieval");
class AiService {
    geminiService = new gemini_service_1.GeminiService();
    promptManager = new promptManager_1.PromptManager();
    retrieval = new knowledgeRetrieval_1.KnowledgeRetrieval();
}
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map