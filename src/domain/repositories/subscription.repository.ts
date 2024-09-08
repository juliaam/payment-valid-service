import { Subscription } from '../entities/subscription.entity';

export abstract class SubscriptionRepository {
  abstract findByCode(code: number): Promise<Subscription>;
  abstract insert(body: Subscription): Promise<Subscription>;
}
