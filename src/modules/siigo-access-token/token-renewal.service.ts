import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SiigoAccessTokenService } from './siigo-access-token.service';

@Injectable()
export class TokenRenewalService implements OnModuleInit {
    private readonly logger = new Logger(TokenRenewalService.name);
    
    constructor(
        private readonly siigoAccessTokenService: SiigoAccessTokenService
    ) {}

    onModuleInit() {
        this.logger.log('TokenRenewalService initialized');
        this.handleTokenRenewal();
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleTokenRenewal() {
        this.logger.log('CRON: Verificando tokens para renovar...');

        // Margen de seguridad: renueva tokens que expiran en los próximos 5 minutos
        const safetyMargin = 5 * 60 * 1000; // 5 minutos en milisegundos
        const expirationLimit = new Date(Date.now() + safetyMargin);

        /* Validamos si el Token requiere ser Renovado */
        const tokenToRenew = await this.siigoAccessTokenService.validateAccessToken(expirationLimit);
        if (tokenToRenew) {
            this.logger.log('CRON: No es necesario renovar el token.');
            return;
        } else {
            this.logger.log('CRON: Es necesario renovar el token.');
            try {
                this.siigoAccessTokenService.saveSiigoAccessToken();
                this.logger.log('CRON: Token renovado correctamente.');
            } catch (error) {
                this.logger.error('CRON: Falló la renovación del token.');
                this.logger.error(error);
            }
        }
    }
}
