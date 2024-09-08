import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { IsActiveSubscription_US } from 'src/application/get-is-valid-subscriptions.use-case';

@Controller('assinvalidas')
export class SubscriptionController {
  constructor(
    private readonly isActiveSubscription_US: IsActiveSubscription_US,
  ) {}

  @Get('/:codass')
  async IsActiveSubscription(@Param() { codass }): Promise<boolean> {
    return await this.isActiveSubscription_US.execute(+codass);
  }

  @EventPattern('payment')
  handlePaymentMade(data: any) {
    console.log('evento recebido:', data);
  }
}
