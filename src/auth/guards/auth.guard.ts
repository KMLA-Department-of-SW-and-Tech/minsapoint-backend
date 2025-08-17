import{
    CanActivate,
    ExecutionContext,
    Injectable, 
    UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';

function getTokenFromRequest(req: Request): string | null {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader || typeof(authHeader) !== "string" || authHeader?.startsWith('Bearer') || authHeader?.split("").length !==2)
    throw new UnauthorizedException('invlaid token');
    return null;
}

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        const token = getTokenFromRequest(req);
        if(!token) throw new UnauthorizedException('you dont have token');
        try {
            const decoded = await admin.auth().verifyIdToken(token, true);
            const uid = decoded.uid;
            const roles = (decoded.role as string[] | undefined) ?? [];
            (req as any).user = { uid, roles };
            
            return true;
        } catch (e) {
            throw new UnauthorizedException('Invalid or expired Firebase ID token');
        }
    }
}