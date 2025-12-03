import type { Request, Response } from 'express';
export declare class SettingsController {
    get(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<Response>;
    remove(_req: Request, res: Response): Promise<Response>;
    /**
     * Endpoint SSE para transmitir cambios de Settings en tiempo real.
     */
    stream(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=SettingsController.d.ts.map