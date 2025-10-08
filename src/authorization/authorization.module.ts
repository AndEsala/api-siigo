import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './guards/permissions.guard';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [],
    providers: [
        { provide: APP_GUARD, useClass: PermissionsGuard },
    ],
    exports: [],
})
export class AuthorizationModule {}
