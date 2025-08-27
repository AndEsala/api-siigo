import { Module } from '@nestjs/common';
import { PaymentReceiptsService } from './payment-receipts.service';
import { PaymentReceiptsController } from './payment-receipts.controller';
import { HttpModule } from '@nestjs/axios';
import { SiigoAccessTokenModule } from '../siigo-access-token/siigo-access-token.module';

@Module({
  imports: [
    HttpModule,
    SiigoAccessTokenModule
  ],
  controllers: [PaymentReceiptsController],
  providers: [PaymentReceiptsService],
})
export class PaymentReceiptsModule {}
