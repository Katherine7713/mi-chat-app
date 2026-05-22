import { User } from "@features/auth/domain/entities/User";
import { IAuthRepository } from "@features/auth/domain/repositories/IAuthRepository";
import { AuthError } from "@shared/domain/error/AppError";

export class RegisterUseCase {
    constructor(private readonly authRepo: IAuthRepository) {}

    async execute(email: string, password:string, username: string): Promise<User> {
        if (!email || !password || !username)
            throw new AuthError("Todos los campos son requeridos");
        if (password.length < 6)
            throw new AuthError("La contraseña debe tener al menos 6 caracteres");
        if (username.includes(' '))
            throw new AuthError("El username no puede contener espacios");
        try {
            return await this.authRepo.register(email, password, username);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al registrar usuario';
            throw new AuthError(message, error);
        }
    }
}