export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly price: number,
  ) {}
}

export class PaymentProcessedEvent {
  constructor(public readonly orderId: string) {}
}

export class PaymentFailedEvent {
  constructor(
    public readonly orderId: string,
    public readonly error: string,
  ) {}
}
