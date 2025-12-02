import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CqrsModule.forRoot(), OrderModule],
  
})
export class AppModule {}
