import * as argon2 from 'argon2';
import * as jose from 'jose';
import { IJWTPayload } from './user/user.interface';
import { JWT_SECRET_KEY } from './config';

export const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

export const checkPasswordHash = async (hash: string, password: string) => {
  return argon2.verify(hash, password);
};

export const signJWT = async (payload: IJWTPayload) => {
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS512' })
    .setIssuedAt()
    .setExpirationTime('1y')
    .sign(JWT_SECRET_KEY);
};

export const verifyJWT = async (
  token: string,
): Promise<{ isAuth: boolean; payload: IJWTPayload }> => {
  try {
    return {
      isAuth: true,
      payload: (await jose.jwtVerify<IJWTPayload>(token, JWT_SECRET_KEY))
        .payload,
    };
  } catch {
    return { isAuth: false, payload: { login: '', id: '' } };
  }
};
