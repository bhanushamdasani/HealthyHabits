import type { IncomingMessage, ServerResponse } from 'http';
import { connectToDatabase } from '../_utils/db';
import { DayLog } from '../_models/DayLog';
import { Profile } from '../_models/Profile';
import { Schedule } from '../_models/Schedule';
import { parseAuthToken } from '../_utils/authMiddleware';
import { sendError, sendSuccess } from '../_utils/response';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    return sendError(res, 405, 'Method Not Allowed');
  }

  const auth = parseAuthToken(req);
  if (!auth) {
    return sendError(res, 401, 'Unauthorized');
  }

  try {
    await connectToDatabase();

    const buffers: Buffer[] = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(buffers).toString());
    const { profile, schedule, dayLogs } = body;

    // 1. Update Profile if provided
    if (profile) {
      await Profile.findOneAndUpdate(
        { userId: auth.userId },
        { ...profile, userId: auth.userId },
        { upsert: true, new: true }
      );
    }

    // 2. Update Schedule if provided
    if (schedule) {
      await Schedule.findOneAndUpdate(
        { userId: auth.userId },
        { weeklySchedule: schedule, userId: auth.userId },
        { upsert: true, new: true }
      );
    }

    // 3. Upsert Day Logs (completions, weights, water, sleep)
    if (Array.isArray(dayLogs)) {
      for (const log of dayLogs) {
        if (log.date) {
          await DayLog.findOneAndUpdate(
            { userId: auth.userId, date: log.date },
            { ...log, userId: auth.userId },
            { upsert: true, new: true }
          );
        }
      }
    }

    return sendSuccess(res, {
      synced: true,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return sendError(res, 500, error.message || 'Server error during batch sync');
  }
}
