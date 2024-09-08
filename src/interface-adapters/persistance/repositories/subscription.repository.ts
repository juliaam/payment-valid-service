import { SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { prisma } from '../database/prisma';
import { Subscription } from 'src/domain/entities/subscription.entity';

export class PrismaSubscriptionRepository implements SubscriptionRepository {
  async findByCode(codass: number): Promise<Subscription> {
    return await prisma.assinatura.findFirst({
      where: {
        codigo: codass,
      },
    });
  }
  async insert(data: Subscription): Promise<Subscription> {
    return await prisma.assinatura.create({
      data,
    });
  }
}
