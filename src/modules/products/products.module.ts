import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';
import { SiigoAccessTokenModule } from '../siigo-access-token/siigo-access-token.module';

@Module({
  imports: [
    HttpModule,
    SiigoAccessTokenModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
