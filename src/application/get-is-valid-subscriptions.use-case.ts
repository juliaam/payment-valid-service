import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, retry } from 'rxjs';
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
      try {
        const assByRegisterService: Response = await firstValueFrom(
          this.subscriptionPaymentService.send('subscription', codass).pipe(
            retry({ delay: 1000, count: 1 }),
            catchError(() => {
              throw new InternalServerErrorException(
                'Falha ao comunicar com o serviço de assinatura.',
              );
            }),
          ),
        );

        if (!assByRegisterService)
          throw new NotFoundException('Essa assinatura não existe!');

        const isValid = checkIsValid(assByRegisterService.fimVigencia);

        await this.subscriptionRepository.insert({
          ...assByRegisterService,
          isValid,
        });

        return isValid;
      } catch {
        throw new NotFoundException('Essa assinatura não existe!');
      }
    }
  }
}
