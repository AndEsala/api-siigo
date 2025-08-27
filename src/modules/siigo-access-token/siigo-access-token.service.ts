import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppConfig } from 'src/app.config';
import { ManageSiigoAccessTokenDto, SiigoAccessTokenDtoBase } from './siigo-access-token.dto';
import { BasicHeaders } from 'src/shared/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiigoAccessToken } from './siigo-access-token.entity';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class SiigoAccessTokenService {
  protected SiigoToken: SiigoAccessToken;

  constructor(
    @InjectRepository(SiigoAccessToken)
    private readonly siigoAcceessTokenRepository: Repository<SiigoAccessToken>,
    private readonly httpService: HttpService
  ) {}

  async findAvailableSiigoAccessToken(): Promise<SiigoAccessToken | null> {
    const availableAccessToken = await this.siigoAcceessTokenRepository.find({ take: 1, order: { created_at: 'ASC' } });
    return availableAccessToken[0];
  }

  async validateAccessToken(expirationLimit: Date): Promise<Boolean> {
    const accessToken = await this.findAvailableSiigoAccessToken();
    if (!accessToken) return false;

    return (accessToken.expires_at <= expirationLimit) ? false : true;
  }

  async saveSiigoAccessToken() {
    const { url_sign_in, username, access_key } = AppConfig.siigo;

    /* Iniciamos Sesión en la API */
    try {
      if (url_sign_in !== undefined) {
        const now = new Date();
        const body = { username, access_key };
        const response = await firstValueFrom(this.httpService.post<SiigoAccessTokenDtoBase>(url_sign_in, body, { headers: BasicHeaders }));
        const generatedSiigoAccessToken: SiigoAccessTokenDtoBase = response.data;
        
        /* Calculamos la fecha de Expiración */
        const expiresIn = generatedSiigoAccessToken.expires_in;
        const expiresAt = new Date(now.getTime() + expiresIn * 1000);

        /* Guardamos en la base de datos el nuevo token */
        const siigoAccesToken: ManageSiigoAccessTokenDto = {
          access_token: generatedSiigoAccessToken.access_token,
          expires_in: generatedSiigoAccessToken.expires_in,
          expires_at: expiresAt,
          token_type: generatedSiigoAccessToken.token_type,
          scope: generatedSiigoAccessToken.scope
        }

        const availableAccessToken = await this.findAvailableSiigoAccessToken();
        if (!availableAccessToken) {
          const newAccessToken = this.siigoAcceessTokenRepository.create({ ...siigoAccesToken });
          const savedAccessToken = await this.siigoAcceessTokenRepository.save(newAccessToken);

          this.SiigoToken = savedAccessToken;
        } else {
          await this.siigoAcceessTokenRepository.update(availableAccessToken.id, { ...siigoAccesToken });
          const actualAccessToken = await this.findAvailableSiigoAccessToken();
          if (actualAccessToken) this.SiigoToken = actualAccessToken;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getHeaders() {
    if (this.SiigoToken == null || this.SiigoToken == undefined) {
      const availableToken = await this.findAvailableSiigoAccessToken();
      if (availableToken) this.SiigoToken = availableToken;
    }

    const headers = {
      ...BasicHeaders,
      "Authorization": this.SiigoToken.access_token
    }

    return headers;
  }
}
