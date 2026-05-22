import { Message } from "@features/chat/domain/entities/Message";
import { IChatRepository } from "@features/chat/domain/repositories/IChatRepository";
import { ChatError } from "@shared/domain/error/AppError";

export class SendMessageUseCase {
    constructor(private readonly chatRepo: IChatRepository) {}
    async execute(
        roomId: string,
        userId: string,
        content: string,
    ): Promise<Message> {
        const trimmed = content.trim();
        if (!trimmed) throw new ChatError("El mensaje no puede estar vacío");
        if (trimmed.length > 500) throw new ChatError("Máximo 500 caracteres");
        return this.chatRepo.sendMessage(roomId, userId, trimmed);
    }
}