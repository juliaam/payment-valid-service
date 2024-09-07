import { Subscription } from '../entities/subscription.entity';

export abstract class SubscriptionRepository {
  abstract isValid(body): Promise<Subscription>;
}
