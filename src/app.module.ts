import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { CorrectionLogController } from './controllers/correction-log.controller';
import { CorrectionLogService } from './services/correction-log.service';
import { AccusationController } from './controllers/accusation.controller';
import { AccusationService } from './services/accusation.service';
import { MeController } from './controllers/me.controller';
import { MeService } from './services/me.service';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AlarmLogService } from './services/alarm-log.service';
import { AlarmLogController } from './controllers/alarm-log.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, CorrectionLogController, AccusationController, MeController, AlarmLogController, AdminController],
  providers: [/*AuthGuard,*/ AppService, UserService, CorrectionLogService, AccusationService, MeService, AlarmLogService, AdminService,
    // { provide: APP_GUARD, useClass: AuthGuard },  
    // { provide: APP_GUARD, useClass: RolesGuard }
  ],
  
})
export class AppModule {}