import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiigoAccessTokenModule } from './modules/siigo-access-token/siigo-access-token.module';
import { ProductsModule } from './modules/products/products.module';
import { AccountGroupsModule } from './modules/account-groups/account-groups.module';
import { AppConfig } from './app.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountsPayableModule } from './modules/accounts-payable/account-payables.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { PaymentReceiptsModule } from './modules/payment-receipts/payment-receipts.module';
import { AuthorizationModule } from './authorization/authorization.module';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: AppConfig.database.host,
  port: AppConfig.database.port,
  username: AppConfig.database.username,
  password: AppConfig.database.password,
  database: AppConfig.database.name,
  entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
  synchronize: false
}

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    SiigoAccessTokenModule, 
    AccountGroupsModule, 
    ProductsModule, 
    AccountsPayableModule, 
    PaymentReceiptsModule,
    ProvidersModule,
    AuthorizationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
