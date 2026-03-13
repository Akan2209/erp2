import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterUserDto } from '../dtos';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data = RegisterUserDto.parse(req.body);
            const user = await authService.registerUser(data);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = LoginDto.parse(req.body);
            const result = await authService.login(data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}
