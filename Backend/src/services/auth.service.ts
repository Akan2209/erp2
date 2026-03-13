import { UserRepository } from '../repositories/user.repository';
import jwt from 'jsonwebtoken';

const userRepo = new UserRepository();

export class AuthService {
    async login(data: any) {
        const user = await userRepo.findByEmail(data.email);
        if (!user || user.password !== data.password) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            {
                id: user.id,
                roleId: user.roleId,
                email: user.email,
                isFaculty: user.role.name === 'FACULTY',
                isMaster: user.role.name === 'MASTER',
            },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        return { token, user };
    }

    async registerUser(data: any) {
        return userRepo.create(data);
    }
}
