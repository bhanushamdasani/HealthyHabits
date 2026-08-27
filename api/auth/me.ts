import type { IncomingMessage, ServerResponse } from 'http';
import { connectToDatabase } from '../_utils/db';
import { Profile } from '../_models/Profile';
import { parseAuthToken } from '../_utils/authMiddleware';
import { sendError, sendSuccess } from '../_utils/response';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const auth = parseAuthToken(req);
  if (!auth) {
    return sendError(res, 401, 'Unauthorized');
  }

  try {
    await connectToDatabase();
    const profile = await Profile.findOne({ userId: auth.userId });

    return sendSuccess(res, {
      user: {
        id: auth.userId,
        email: auth.email,
        name: profile?.name || 'Warrior',
        profile
      }
    });
  } catch (error: any) {
    return sendError(res, 500, error.message || 'Server error fetching user');
  }
}
