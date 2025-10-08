import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AccountsPayableService } from './accounts-payable.service';
import { PermissionEnum } from 'src/authorization/permissions.enum';
import { PermissionsGuard } from 'src/authorization/guards/permissions.guard';
import { Permissions } from 'src/authorization/permissions.decorator';

@Controller('accounts-payable')
export class AccountsPayableController {
  constructor(private readonly accountsPayableService: AccountsPayableService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionEnum.RETRIEVE_ACCOUNT_PAYABLES)
  async findAll(
    @Query("page") page: number = 1, 
    @Query("page_size") page_size: number = 25,
    @Query("due_date_start") due_date_start: string,
    @Query("due_date_end") due_date_end: string,
    @Query("provider_identification") provider_identification: string,
    @Query("provider_branch_office") provider_branch_office: string,
  ) {
    return this.accountsPayableService.findAllPaginated(page, page_size, due_date_start, due_date_end, provider_identification, provider_branch_office);
  }
}
