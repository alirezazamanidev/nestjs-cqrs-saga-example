import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { ProcessPaymentCommand } from '../commands';
import { PaymentProcessedEvent, PaymentFailedEvent } from '../events';
import { Logger } from '@nestjs/common';

@CommandHandler(ProcessPaymentCommand)
export class ProcessPaymentHandler implements ICommandHandler<ProcessPaymentCommand> {
  private readonly logger = new Logger(ProcessPaymentHandler.name);

  constructor(private readonly eventBus: EventBus) {}

  async execute(command: ProcessPaymentCommand) {
    this.logger.log(`💳 Step 2: Processing payment for Order ${command.orderId}...`);

    // شبیه‌سازی تاخیر درگاه بانک
    await new Promise(resolve => setTimeout(resolve, 1000));

    // شبیه‌سازی موفقیت یا شکست (80% موفقیت)
    const isSuccess = Math.random() > 0.2; 

    if (isSuccess) {
      this.logger.log('✅ Payment Gateway: Success!');
      this.eventBus.publish(new PaymentProcessedEvent(command.orderId));
    } else {
      this.logger.error('❌ Payment Gateway: Failed! (No Money)');
      this.eventBus.publish(new PaymentFailedEvent(command.orderId, 'Insufficient funds'));
    }
  }
}