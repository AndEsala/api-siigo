import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../permissions.decorator';
import { PermissionEnum } from '../permissions.enum';
import { extractTokenFromHeader } from '../utilities/extrac-token';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timeout } from 'rxjs';
import { AppConfig } from 'src/app.config';
import { ApiResponse } from 'src/shared/helpers/api-response';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);
  private readonly TIMEOUT_MS = 5000; // 5 segundos timeout

  constructor(
    private readonly httpService: HttpService,
    private readonly reflector: Reflector,
  ) {}  
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<PermissionEnum[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Log de los permisos requeridos
    this.logger.debug(`Required permissions: ${JSON.stringify(requiredPermissions)}`);

    // Si no hay permisos requeridos, permitir acceso
    if (!requiredPermissions || requiredPermissions.length === 0) {
      this.logger.debug('No permissions required, allowing access');
      return true;
    }

    // Extraer token del header
    const token = extractTokenFromHeader(context.switchToHttp().getRequest());
    if (!token) {
      this.logger.warn('No token found in request');
      throw new UnauthorizedException('Authentication token is required');
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      this.logger.debug(`Checking permissions with Aegis service: ${AppConfig.api.aegis}/aegis/api/v1/auth/permissions`);
      this.logger.debug(`Permissions to check: ${JSON.stringify(requiredPermissions)}`);

      const response = await firstValueFrom(
        this.httpService.post<ApiResponse<boolean>>(`${AppConfig.api.aegis}/aegis/api/v1/auth/permissions`, {
          permissions: requiredPermissions,
        }, { 
          headers,
          timeout: this.TIMEOUT_MS 
        }).pipe(
          timeout(this.TIMEOUT_MS)
        )
      );

      const hasPermission = response.data.data;
      this.logger.debug(`Permission check response: ${JSON.stringify(hasPermission)}`);

      // Si el usuario NO tiene permisos, denegar acceso
      if (hasPermission == false) {
        this.logger.warn(`Access denied. User does not have required permissions: ${JSON.stringify(requiredPermissions)}`);
        throw new ForbiddenException(`You do not have permission to access this resource.`);
      }

      // Si llegamos aquí, el usuario tiene permisos
      this.logger.debug('Access granted');
      return true;

    } catch (error) {
      // Si es una excepción que ya lanzamos (ForbiddenException), re-lanzarla
      if (error instanceof ForbiddenException) {
        throw error;
      }

      // Para otros errores (problemas de conexión, etc.)
      this.logger.error(`Error checking permissions: ${error.message}`, error.stack);
      
      // En caso de error del servicio, por seguridad DENEGAR acceso
      throw new UnauthorizedException('Unable to verify permissions. Please try again later.');
    }
  }
}
