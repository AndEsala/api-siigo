import { Module } from '@nestjs/common';
import { AccountGroupsService } from './account-groups.service';
import { AccountGroupsController } from './account-groups.controller';

@Module({
  controllers: [AccountGroupsController],
  providers: [AccountGroupsService],
})
export class AccountGroupsModule {}
