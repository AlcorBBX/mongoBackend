import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(5000);
  app.use(
    session({
      cookie: {
        maxAge: 86400000
      },
      secret: 'fdsfsdfsdf',
      resave: false,
      saveUnitialized: false,

    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
}
bootstrap();
