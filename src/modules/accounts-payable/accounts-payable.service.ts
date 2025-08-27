import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SiigoAccessTokenService } from '../siigo-access-token/siigo-access-token.service';
import { AppConfig } from 'src/app.config';
import { firstValueFrom } from 'rxjs';
import { SiigoApiResponse } from 'src/shared/helpers/siigo-api-response';
import { AccountPayable } from './account-payable.entity';

@Injectable()
export class AccountsPayableService {
  private base_url: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly siigoService: SiigoAccessTokenService
  ) {
    this.base_url = `${AppConfig.siigo.base_path}/accounts-payable`;
  }

  async findAllPaginated(
    page: number = 1, 
    page_size: number = 25,
    due_date_start: string,
    due_date_end: string,
    provider_identification: string,
    provider_branch_office: string,
  ) {
    try {
      const headers = await this.siigoService.getHeaders();
      let url = `${this.base_url}?page=${page}&page_size=${page_size}`;

      if (due_date_start) url += `&due_date_start=${due_date_start}`;
      if (due_date_end) url += `&due_date_end=${due_date_end}`;
      if (provider_identification) url += `&provider_identification=${provider_identification}`;
      if (provider_branch_office) url += `&provider_branch_office=${provider_branch_office}`;

      const response = await firstValueFrom(this.httpService.get<SiigoApiResponse<AccountPayable[]>>(url, { headers }));
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
