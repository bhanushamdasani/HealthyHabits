import type { IncomingMessage, ServerResponse } from 'http';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../_utils/db';
import { User } from '../_models/User';
import { Profile } from '../_models/Profile';
import { generateAuthToken, createAuthCookie } from '../_utils/authMiddleware';
import { sendError, sendSuccess } from '../_utils/response';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method Not Allowed');
  }

  try {
    await connectToDatabase();

    // Read body stream
    const buffers: Buffer[] = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(buffers).toString());
    const { email, password, name } = body;

    if (!email || !password || password.length < 6) {
      return sendError(res, 400, 'Valid email and minimum 6-character password required.');
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return sendError(res, 400, 'An account with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email.toLowerCase().trim(),
      passwordHash
    });

    await Profile.create({
      userId: newUser._id,
      name: name || 'Warrior'
    });

    const token = generateAuthToken({ userId: String(newUser._id), email: newUser.email });
    res.setHeader('Set-Cookie', createAuthCookie(token));

    return sendSuccess(res, {
      user: { id: String(newUser._id), email: newUser.email, name: name || 'Warrior' }
    }, 201);
  } catch (error: any) {
    return sendError(res, 500, error.message || 'Server error during registration');
  }
}
