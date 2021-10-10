/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
        logger: ['debug', 'verbose', 'warn', 'error', 'log']
    });
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useLogger(app.get(Logger));
    const port = process.env.PORT || 3333;
    app.use(cookieParser());
    await app.listen(port, () => {
        console.log(
            'Listening at http://localhost:' + port + '/' + globalPrefix
        );
    });
}

bootstrap();
