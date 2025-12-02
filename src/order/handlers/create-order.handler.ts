import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateOrderCommand } from "../commands";
import { randomInt, randomUUID } from "crypto";
import { Order } from "../order.model";
@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {

    constructor(private readonly publisher: EventPublisher){}
    async execute(command: CreateOrderCommand): Promise<any> {
        console.log(`🔹 Step 1: Creating order for user ${command.userId}...`);
        const orderId = randomUUID();
        const order = this.publisher.mergeObjectContext(new Order(orderId));
    
    
    order.createOrder(command.userId, command.price);
    order.commit();
    
    console.log(`✅ Order ${orderId} Created via Aggregate.`);
    return { orderId };
  }


}