import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('idToken') idToken: string) {
    return this.authService.verifyFirebaseAndIssueJWT(idToken);
  }
}