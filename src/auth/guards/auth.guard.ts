import{
    CanActivate,
    ExecutionContext,
    Injectable, 
    UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { MeService } from 'src/services/me.service';

function getTokenFromRequest(req: Request): string | null {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader || typeof(authHeader) !== "string" || !(authHeader?.startsWith('Bearer')) || authHeader?.split(" ").length !==2)
        throw new UnauthorizedException('invlaid token');
    return authHeader.split(" ")[1];
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly users: MeService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        const token = getTokenFromRequest(req);
        if(!token) throw new UnauthorizedException('you dont have token');
        try {
            const decoded = await admin.auth().verifyIdToken(token, true);
            const uid = decoded.uid;
            (req as any).firebaseUID = uid;

            const doc = await this.users.getUserFromFirebaseUID(uid);
            console.log("auth.gaurd success");
            console.log(doc);
            if(!doc) throw new UnauthorizedException('User not found');
            (req as any).role = doc.role 

            return true;
        } catch (e) {
            throw new UnauthorizedException('Invalid or expired Firebase ID token');
        }
    }
}