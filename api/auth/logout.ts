import type { IncomingMessage, ServerResponse } from 'http';
import { clearAuthCookie } from '../_utils/authMiddleware';
import { sendSuccess } from '../_utils/response';

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Set-Cookie', clearAuthCookie());
  return sendSuccess(res, { loggedOut: true });
}
