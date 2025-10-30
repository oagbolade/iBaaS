// lib/runtimeConfig.ts
let cachedConfig: Record<string, string> | null = null;

export async function getRuntimeConfig() {
  if (cachedConfig) return cachedConfig;
  const res = await fetch('/api/runtime-config');
  cachedConfig = await res.json();
  return cachedConfig;
}
