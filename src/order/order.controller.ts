import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from './commands';

@Controller('order')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() body: { userId: string; price: number }) {
    return this.commandBus.execute(new CreateOrderCommand(body.userId, body.price));
  }
}