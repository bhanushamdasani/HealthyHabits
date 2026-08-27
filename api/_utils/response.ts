import type { ServerResponse } from 'http';

export function sendJson(res: ServerResponse, statusCode: number, data: any): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function sendError(res: ServerResponse, statusCode: number, message: string, details?: any): void {
  sendJson(res, statusCode, {
    success: false,
    error: message,
    ...(details ? { details } : {})
  });
}

export function sendSuccess(res: ServerResponse, data: any, statusCode: number = 200): void {
  sendJson(res, statusCode, {
    success: true,
    data
  });
}
