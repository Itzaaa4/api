import { User } from '../entities/User.js';
export declare class UserService {
    private userRepository;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
    updateUser(id: number, userData: Partial<User>): Promise<User | null>;
    deleteUser(id: number): Promise<boolean>;
}
//# sourceMappingURL=UserService.d.ts.map