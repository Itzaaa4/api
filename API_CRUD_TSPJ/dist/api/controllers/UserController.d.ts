import type { Request, Response } from 'express';
export declare class UserController {
    getAllUsers(req: Request, res: Response): Promise<Response>;
    getUserById(req: Request, res: Response): Promise<Response>;
    createUser(req: Request, res: Response): Promise<Response>;
    updateUser(req: Request, res: Response): Promise<Response>;
    deleteUser(req: Request, res: Response): Promise<Response>;
}
//# sourceMappingURL=UserController.d.ts.map