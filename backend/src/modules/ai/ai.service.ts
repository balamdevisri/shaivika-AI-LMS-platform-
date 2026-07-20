import { GeminiService } from './gemini.service';
import { PromptManager } from './prompts/promptManager';
import { KnowledgeRetrieval } from './retrieval/knowledgeRetrieval';

export class AiService {
  private geminiService = new GeminiService();
  private promptManager = new PromptManager();
  private retrieval = new KnowledgeRetrieval();
}