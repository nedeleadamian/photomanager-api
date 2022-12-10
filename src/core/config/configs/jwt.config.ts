import { registerAs } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: Number(process.env.JWT_EXPIRE),
}));
