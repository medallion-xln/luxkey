import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Response } from 'express';
import jwt from 'jsonwebtoken'; // Assuming you're using JWT

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
}

export function generateToken(userId: string): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust the expiration as needed
}