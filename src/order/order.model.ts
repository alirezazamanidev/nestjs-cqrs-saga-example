import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreatedEvent } from './events';

export class Order extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }
  createOrder(userId: string, price: number) {
    this.apply(new OrderCreatedEvent(this.id, userId, price));
  }
}