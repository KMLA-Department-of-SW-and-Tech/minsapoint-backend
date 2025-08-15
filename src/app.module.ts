import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { CorrectionLogController } from './controllers/correction-log.controller';
import { CorrectionLogService } from './services/correction-log.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, CorrectionLogController],
  providers: [AppService, UserService, CorrectionLogService],
})
export class AppModule {}
