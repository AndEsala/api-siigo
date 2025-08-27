import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, host, serviceName, baseApi, versionApi } = AppConfig.app;

  /* Habilitar CORS */
  app.enableCors(AppConfig.cors);

  /* Validar exactitud de los datos (Recibir exactamente los datos que se solicitan) */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  /* Prefijo global de la API */
  app.setGlobalPrefix(`${serviceName}/${baseApi}/${versionApi}`);


  /* Habilitar puerto */
  await app.listen(port);
  console.log(`Application running on http://${host}:${port}`);
}

/* Capturar error y terminar ejecución */
bootstrap().catch((error) => {
  console.error('Error during application bootstrap', error);
  process.exit(1);
});