import { Module } from '@nestjs/common';
import { SubscriptionController } from './interface-adapters/controllers/main.controller';
import { IsActiveSubscription_US } from './application/get-is-valid-subscriptions.use-case';
import { SubscriptionRepository } from './domain/repositories/subscription.repository';
import { PrismaSubscriptionRepository } from './interface-adapters/persistance/repositories/subscription.repository';

@Module({
  imports: [],
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
