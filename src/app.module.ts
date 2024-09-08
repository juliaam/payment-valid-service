import { Module } from '@nestjs/common';
import { SubscriptionController } from './interface-adapters/controllers/main.controller';
import { IsActiveSubscription_US } from './application/get-is-valid-subscriptions.use-case';
import { SubscriptionRepository } from './domain/repositories/subscription.repository';
import { PrismaSubscriptionRepository } from './interface-adapters/persistance/repositories/subscription.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'payment_service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://kmwhllfz:OWG7biH_cT6cTcUt2cfh1dh0RIhDqV0f@jackal.rmq.cloudamqp.com/kmwhllfz',
          ],
          queue: 'payment_queue_send',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [
    IsActiveSubscription_US,
    {
      provide: SubscriptionRepository,
      useClass: PrismaSubscriptionRepository,
    },
  ],
})
export class AppModule {}
