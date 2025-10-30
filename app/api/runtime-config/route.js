import { NextResponse } from 'next/server';

export async function GET() {
  const clientConfig = {
    NEXT_PUBLIC_LOGIN_KEY: process.env.NEXT_PUBLIC_LOGIN_KEY,
    NEXT_PUBLIC_LOGIN_IV: process.env.NEXT_PUBLIC_LOGIN_IV,
    NEXT_PUBLIC_NIP_USERNAME: process.env.NEXT_PUBLIC_NIP_USERNAME,
    NEXT_PUBLIC_NIP_PASSWORD: process.env.NEXT_PUBLIC_NIP_PASSWORD,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    nodeEnv: process.env.NODE_ENV
  };

  // To prevent caching and ensure a fresh value on every request:
  return NextResponse.json(clientConfig, {
    headers: { 'Cache-Control': 'no-store' }
  });
}

// Add urls based on environment // UAT // Development // Production
// Add secret keys
