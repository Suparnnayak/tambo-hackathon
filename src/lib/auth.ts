/**
 * Server-side auth utilities
 * Note: For NextAuth v5, use auth() from next-auth directly
 */

// This file is kept for backward compatibility
// For new code, import { auth } from 'next-auth' directly

export async function getCurrentUser() {
  // Placeholder - use auth() from next-auth v5 in actual implementation
  return null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

