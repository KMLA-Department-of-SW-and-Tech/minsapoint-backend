import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { CorrectionLogController } from './controllers/correction-log.controller';
import { CorrectionLogService } from './services/correction-log.service';
import { AccusationController } from './controllers/accusation.controller';
import { AccusationService } from './services/accusation.service';
@Module({
  imports: [],
  controllers: [AppController, UserController, CorrectionLogController, AccusationController],
  providers: [AppService, UserService, CorrectionLogService, AccusationService],
})
export class AppModule {}