import { SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { prisma } from '../database/prisma';
import { Subscription } from 'src/domain/entities/subscription.entity';

export class PrismaSubscriptionRepository implements SubscriptionRepository {
  async isValid(codass: number): Promise<Subscription> {
    return await prisma.subscription.findFirst({
      where: {
        codAssinatura: codass,
      },
    });
  }
}
