import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderSaga } from './order.saga';
import { CreateOrderHandler } from './handlers/create-order.handler';
import { ProcessPaymentHandler } from './handlers/process-payment.handler';
import { ShipOrderHandler } from './handlers/ship-order.handler';
import { CancelOrderHandler } from './handlers/cancel-order.handler';

@Module({
  controllers: [OrderController],

  providers: [
    OrderSaga,
    CreateOrderHandler,
    ProcessPaymentHandler,
    ShipOrderHandler,
    CancelOrderHandler,
  ],
})
export class OrderModule {}
