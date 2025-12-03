// src/api/services/UserService.ts
import { AppDataSource } from '../../config/data-source.js';
import { User } from '../entities/User.js';
export class UserService {
    userRepository = AppDataSource.getRepository(User);
    async getAllUsers() {
        return this.userRepository.find();
    }
    async getUserById(id) {
        return this.userRepository.findOneBy({ id });
    }
    async createUser(userData) {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
    async updateUser(id, userData) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            return null;
        Object.assign(user, userData);
        return this.userRepository.save(user);
    }
    async deleteUser(id) {
        const result = await this.userRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
//# sourceMappingURL=UserService.js.map