import { Controller, Get, Param } from '@nestjs/common';
import { IsActiveSubscription_US } from 'src/application/get-is-valid-subscriptions.use-case';

@Controller('assinvalidas')
export class SubscriptionController {
  constructor(
    private readonly isActiveSubscription_US: IsActiveSubscription_US,
  ) {}

  @Get('/:codass')
  async IsActiveSubscription(@Param() codass: string): Promise<boolean> {
    return await this.isActiveSubscription_US.execute(+codass);
  }
}
