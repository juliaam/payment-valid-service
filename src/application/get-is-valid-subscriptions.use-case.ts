import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from 'src/domain/repositories/subscription.repository';

@Injectable()
export class IsActiveSubscription_US {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(codass: number): Promise<boolean> {
    await this.subscriptionRepository.isValid(codass);
    return true;
  }
}
