import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountGroupsService } from './account-groups.service';

@Controller('account-groups')
export class AccountGroupsController {
  constructor(private readonly accountGroupsService: AccountGroupsService) {}

  @Get()
  async findAll() {
    return this.accountGroupsService.findAll();
  }
}
