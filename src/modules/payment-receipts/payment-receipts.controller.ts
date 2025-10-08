import { Controller, Get, Post, Body, Patch, Param, Delete, Query,UseGuards } from '@nestjs/common';
import { PaymentReceiptsService } from './payment-receipts.service';
import { PermissionEnum } from 'src/authorization/permissions.enum';
import { PermissionsGuard } from 'src/authorization/guards/permissions.guard';
import { Permissions } from 'src/authorization/permissions.decorator';

@Controller('payment-receipts')
export class PaymentReceiptsController {
  constructor(private readonly paymentReceiptsService: PaymentReceiptsService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionEnum.RETRIEVE_PAYMENT_RECEIPTS)
  async findAll(
    @Query("page") page: number = 1, 
    @Query("page_size") page_size: number = 25
  ) {
    return this.paymentReceiptsService.findAllPaginated(page, page_size);
  }
}
