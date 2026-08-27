import type { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'healthyhabits_super_secure_jwt_secret_dev';

export interface AuthenticatedUser {
  userId: string;
  email: string;
}

export function parseAuthToken(req: IncomingMessage): AuthenticatedUser | null {
  try {
    const cookiesHeader = req.headers.cookie || '';
    const parsedCookies = cookie.parse(cookiesHeader);
    const token = parsedCookies['auth_token'] || (req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null);

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    return decoded;
  } catch {
    return null;
  }
}

export function generateAuthToken(user: AuthenticatedUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });
}

export function createAuthCookie(token: string): string {
  return cookie.serialize('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/'
  });
}

export function clearAuthCookie(): string {
  return cookie.serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  });
}
