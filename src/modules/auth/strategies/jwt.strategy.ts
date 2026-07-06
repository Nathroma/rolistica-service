import { AuthUser } from '@/modules/auth/types/auth-user.type';
import { JwtPayload } from '@/modules/auth/types/jwt-payload.type';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'dev-secret-change-me',
        });
    }

    validate(payload: JwtPayload): AuthUser {
        return {
            userId: payload.sub,
            email: payload.email,
        };
    }
}
