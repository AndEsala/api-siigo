import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SiigoAccessTokenService } from '../siigo-access-token/siigo-access-token.service';
import { AppConfig } from 'src/app.config';
import { firstValueFrom } from 'rxjs';
import { SiigoApiResponse } from 'src/shared/helpers/siigo-api-response';
import { AccountPayable } from './payment-receipt.entity';
import { PaymentReceipt } from './payment-receipt.dto';

@Injectable()
export class PaymentReceiptsService {
  private base_url: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly siigoService: SiigoAccessTokenService
  ) {
    this.base_url = `${AppConfig.siigo.base_path}/payment-receipts`;
  }

  async findAllPaginated(
    page: number = 1, 
    page_size: number = 25,
  ) {
    try {
      const headers = await this.siigoService.getHeaders();
      let url = `${this.base_url}?page=${page}&page_size=${page_size}`;

      const response = await firstValueFrom(this.httpService.get<SiigoApiResponse<PaymentReceipt[]>>(url, { headers }));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
