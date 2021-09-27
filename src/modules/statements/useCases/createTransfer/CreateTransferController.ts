import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransferUseCase } from "./CreateTransferUseCases";

class CreateTransferController {
  async handle(request: Request, response: Response) {
    const { user_id: receiveUserId } = request.params;
    const { amount, description } = request.body;

    const createTransferUseCase = container.resolve(CreateTransferUseCase);

    await createTransferUseCase.execute({
      amount,
      description,
      receiveUserId,
      senderUserId: request.user.id,
    });
  }
}

export { CreateTransferController };
