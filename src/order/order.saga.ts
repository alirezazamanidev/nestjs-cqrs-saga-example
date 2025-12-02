import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { OrderCreatedEvent, PaymentFailedEvent, PaymentProcessedEvent } from './events';
import { CancelOrderCommand, ProcessPaymentCommand, ShipOrderCommand } from './commands';

@Injectable()
export class OrderSaga {
  private readonly logger = new Logger(OrderSaga.name);

  // سناریو ۱: سفارش ساخته شد -> برو پول بگیر
  @Saga()
  orderCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      delay(500), // کمی مکث برای واقعی شدن
      map(event => {
        this.logger.log(`[Saga] 👀 Order Created. Triggering Payment...`);
        return new ProcessPaymentCommand(event.orderId, event.price);
      }),
    );
  }

  // سناریو ۲: پرداخت موفق شد -> کالا را بفرست
  @Saga()
  paymentSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentProcessedEvent),
      map(event => {
        this.logger.log(`[Saga] 💰 Payment OK. Shipping Order...`);
        return new ShipOrderCommand(event.orderId);
      }),
    );
  }

  // سناریو ۳: پرداخت خراب شد -> سفارش را کنسل کن (Rollback)
  @Saga()
  paymentFailed = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentFailedEvent),
      map(event => {
        this.logger.error(`[Saga] ⚠️ Payment Failed. Rolling back...`);
        return new CancelOrderCommand(event.orderId, event.error);
      }),
    );
  }
}