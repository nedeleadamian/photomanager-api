import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const appName = process.env.APP_NAME.toUpperCase();

  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({ origin: '*' });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup(
      'swagger',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle(appName)
          .setDescription(`${appName} - API`)
          .setVersion('1.0')
          .addBearerAuth()
          .build(),
      ),
    );
  }

  await app.listen(process.env.SERVER_PORT);
}
void bootstrap();
