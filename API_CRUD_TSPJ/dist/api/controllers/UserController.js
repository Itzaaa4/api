import { UserService } from '../services/UserService.js';
const userService = new UserService();
export class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al obtener los usuarios', error });
        }
    }
    async getUserById(req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ message: 'ID inválido' });
        try {
            const user = await userService.getUserById(id);
            if (!user)
                return res.status(404).json({ message: 'Usuario no encontrado' });
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al obtener el usuario', error });
        }
    }
    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            return res.status(201).json(newUser);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al crear el usuario', error });
        }
    }
    async updateUser(req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ message: 'ID inválido' });
        try {
            const updatedUser = await userService.updateUser(id, req.body);
            if (!updatedUser)
                return res.status(404).json({ message: 'Usuario no encontrado' });
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al actualizar el usuario', error });
        }
    }
    async deleteUser(req, res) {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ message: 'ID inválido' });
        try {
            const deleted = await userService.deleteUser(id);
            if (!deleted)
                return res.status(404).json({ message: 'Usuario no encontrado' });
            return res.status(200).json({ message: 'Usuario eliminado correctamente' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el usuario', error });
        }
    }
}
//# sourceMappingURL=UserController.js.map