import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { AccusationController } from './controllers/accusation.controller';
import { UserService } from './services/user.service';
import { AccusationService } from './services/accusation.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    AccusationController,
  ],
  providers: [
    AppService,
    UserService,
    AccusationService,
  ],
})
export class AppModule {}
