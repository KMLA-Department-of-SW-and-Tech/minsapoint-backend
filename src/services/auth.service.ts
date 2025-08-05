import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { firebaseAdmin } from '../config/firebaseConfig';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async verifyFirebaseAndIssueJWT(idToken: string) {
    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
      const userDoc = await firebaseAdmin.firestore().collection('users').doc(decoded.uid).get();
      const userData = userDoc.data();

      if (!userData) throw new UnauthorizedException('사용자 정보 없음');

      const payload = { uid: decoded.uid, role: userData.role };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, user: userData };
    } catch (error) {
      throw new UnauthorizedException('Firebase 토큰 검증 실패'); // change comment
    }
  }
}