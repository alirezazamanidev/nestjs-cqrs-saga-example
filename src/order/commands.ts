

export class CreateOrderCommand {
  constructor(public readonly userId: string, public readonly price: number) {}
}

export class ProcessPaymentCommand {
  constructor(public readonly orderId: string, public readonly price: number) {}
}

export class ShipOrderCommand {
  constructor(public readonly orderId: string) {}
}

export class CancelOrderCommand {
  constructor(public readonly orderId: string, public readonly reason: string) {}
}