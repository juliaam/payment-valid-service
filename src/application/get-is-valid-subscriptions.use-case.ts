import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Subscription } from 'src/domain/entities/subscription.entity';
import { SubscriptionRepository } from 'src/domain/repositories/subscription.repository';
import { checkIsValid } from 'src/helpers/isValid';

type Response = Omit<Subscription, 'isValid'>;
@Injectable()
export class IsActiveSubscription_US {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    @Inject('payment_service') private subscriptionPaymentService: ClientProxy,
  ) {}

  async execute(codass: number): Promise<boolean> {
    const assinatura = await this.subscriptionRepository.findByCode(codass);

    if (assinatura) return assinatura.isValid;

    if (!assinatura) {
      const assByRegisterService: Response = await firstValueFrom(
        this.subscriptionPaymentService.send('subscription', codass),
      );

      if (!assByRegisterService)
        throw new NotFoundException('Essa assinatura não existe!');

      const isValid = checkIsValid(assByRegisterService.fimVigencia);

      await this.subscriptionRepository.insert({
        ...assByRegisterService,
        isValid,
      });

      return isValid;
    }
  }
}
