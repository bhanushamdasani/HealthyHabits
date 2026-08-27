import type { IncomingMessage, ServerResponse } from 'http';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../_utils/db';
import { User } from '../_models/User';
import { Profile } from '../_models/Profile';
import { generateAuthToken, createAuthCookie } from '../_utils/authMiddleware';
import { sendError, sendSuccess } from '../_utils/response';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method Not Allowed');
  }

  try {
    await connectToDatabase();

    const buffers: Buffer[] = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(buffers).toString());
    const { email, password } = body;

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required.');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return sendError(res, 401, 'Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return sendError(res, 401, 'Invalid email or password.');
    }

    const profile = await Profile.findOne({ userId: user._id });

    const token = generateAuthToken({ userId: String(user._id), email: user.email });
    res.setHeader('Set-Cookie', createAuthCookie(token));

    return sendSuccess(res, {
      user: {
        id: String(user._id),
        email: user.email,
        name: profile?.name || 'Warrior'
      }
    });
  } catch (error: any) {
    return sendError(res, 500, error.message || 'Server error during login');
  }
}
