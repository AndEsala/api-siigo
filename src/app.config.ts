import { config } from "dotenv";
import { resolve } from "path";

const environment = 
    process.env.NODE_ENV 
    || process.argv.find((arg) => arg.startsWith('--env='))?.split('=')[1]
    || 'development';

const envFilePath = resolve(__dirname, `../environments/.env.${environment}`);

config({ path: envFilePath })
console.log(`Loaded environment from: ${envFilePath}`);

export const AppConfig = {
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'password',
        name: process.env.DATABASE_NAME || 'your_database',
    },
    app: {
        port: parseInt(process.env.PORT || '3000', 10),
        host: process.env.HOST || 'localhost',
        serviceName: process.env.SERVICE_NAME || 'siigo',
        baseApi: process.env.BASE_API || 'api',
        versionApi: process.env.VERSION_API || 'v1',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true
    },
    siigo: {
        username: process.env.SIIGO_USERNAME,
        access_key: process.env.SIIGO_ACCESS_KEY,
        base_path: `${process.env.SIIGO_BASE_PATH}/v1`,
        url_sign_in: process.env.SIIGO_URL_SIGN_IN
    }
}