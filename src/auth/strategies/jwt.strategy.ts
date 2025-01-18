import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { prisma } from '../../lib/prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true
    });
  }

  async validate(req: any, payload: { id: string, email: string }) {
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
