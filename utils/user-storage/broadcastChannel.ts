// utils/user-storage/broadcastChannel.ts
export const getBroadcastChannel = () => {
  if (typeof window !== 'undefined') {
    return new BroadcastChannel('auth_channel');
  }
  return null; // Return null on the server
};

export const setSessionActive = (userId: string, sessionId: string) => {
  if (typeof window !== 'undefined') {
    const sessionData = { userId, sessionId, timestamp: Date.now() };
    localStorage.setItem('activeSession', JSON.stringify(sessionData));
    getBroadcastChannel()?.postMessage({
      type: 'SESSION_START',
      ...sessionData
    });
  }
};

export const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('activeSession');
    getBroadcastChannel()?.postMessage({ type: 'SESSION_END' });
  }
};
