import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ShipOrderCommand } from '../commands';
import { Logger } from '@nestjs/common';

@CommandHandler(ShipOrderCommand)
export class ShipOrderHandler implements ICommandHandler<ShipOrderCommand> {
  async execute(command: ShipOrderCommand) {
    Logger.log(`🚚 Step 3 (Final): Order ${command.orderId} is being shipped!`, 'ShipOrderHandler');
  }
}