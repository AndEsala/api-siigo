import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentReceiptsService } from './payment-receipts.service';

@Controller('payment-receipts')
export class PaymentReceiptsController {
  constructor(private readonly paymentReceiptsService: PaymentReceiptsService) {}

  @Get()
  async findAll(
    @Query("page") page: number = 1, 
    @Query("page_size") page_size: number = 25
  ) {
    return this.paymentReceiptsService.findAllPaginated(page, page_size);
  }
}
