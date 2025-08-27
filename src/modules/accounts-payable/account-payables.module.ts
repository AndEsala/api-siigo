import { Module } from '@nestjs/common';
import { AccountsPayableService } from './accounts-payable.service';
import { AccountsPayableController } from './accounts-payable.controller';
import { HttpModule } from '@nestjs/axios';
import { SiigoAccessTokenModule } from '../siigo-access-token/siigo-access-token.module';

@Module({
  imports: [
    HttpModule,
    SiigoAccessTokenModule
  ],
  controllers: [AccountsPayableController],
  providers: [AccountsPayableService],
})
export class AccountsPayableModule {}
