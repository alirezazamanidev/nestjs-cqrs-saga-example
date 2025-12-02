import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelOrderCommand } from '../commands';
import { Logger } from '@nestjs/common';

@CommandHandler(CancelOrderCommand)
export class CancelOrderHandler implements ICommandHandler<CancelOrderCommand> {
  async execute(command: CancelOrderCommand) {
    Logger.warn(`🗑️ Step 3 (Compensate): Order ${command.orderId} CANCELLED. Reason: ${command.reason}`, 'CancelOrderHandler');
  }
}