import { Module } from '@nestjs/common';
import { SiigoAccessTokenService } from './siigo-access-token.service';
import { HttpModule } from '@nestjs/axios';
import { TokenRenewalService } from './token-renewal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiigoAccessToken } from './siigo-access-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiigoAccessToken]),
    HttpModule
  ],
  providers: [SiigoAccessTokenService, TokenRenewalService],
  exports: [SiigoAccessTokenService]
})
export class SiigoAccessTokenModule {}
