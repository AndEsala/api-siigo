import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AppConfig } from 'src/app.config';
import { SiigoAccessTokenService } from '../siigo-access-token/siigo-access-token.service';
import { firstValueFrom } from 'rxjs';
import { SiigoApiResponse } from 'src/shared/helpers/siigo-api-response';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  private base_url: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly siigoService: SiigoAccessTokenService
  ) {
    this.base_url = `${AppConfig.siigo.base_path}/products`;
  }

  async findAll() {
    try {
      const headers = await this.siigoService.getHeaders();
      const response = await firstValueFrom(this.httpService.get<SiigoApiResponse<ProductDto[]>>(this.base_url, { headers }));
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  }
}
