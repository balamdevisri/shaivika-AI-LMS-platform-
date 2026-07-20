import { Request, Response } from 'express';
export declare class AiController {
    private aiService;
    chat: (req: Request, res: Response, next: import("express").NextFunction) => void;
    quiz: (req: Request, res: Response, next: import("express").NextFunction) => void;
    assignment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    summary: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=ai.controller.d.ts.map