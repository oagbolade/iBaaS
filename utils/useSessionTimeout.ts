'use client'; // Ensure this runs only on the client
import { useContext, useEffect } from 'react';
import { AlertColor } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  clearSession,
  generateSessionId,
  setSessionActive
} from './user-storage/broadcastChannel';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';

const useSingleTabSession = () => {
  const router = useRouter();
  const { toggleSnackbar, setMessage, setSeverity } =
    useContext(MuiSnackbarContext);

  const toast = (message: string, severity: AlertColor) => {
    toggleSnackbar();
    setMessage(message);
    setSeverity(severity);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server

    const broadcastChannel = new BroadcastChannel('auth_channel');
    const existingSessionId = localStorage.getItem('activeSession');

    // Generate a new session ID for this tab
    const newSessionId = generateSessionId();
    // Announce this tab's presence
    broadcastChannel.postMessage({
      type: 'SESSION_START',
      sessionId: newSessionId
    });

    // Listen for other tabs
    broadcastChannel.onmessage = (event) => {
      const { type, sessionId } = event.data;

      if (type === 'SESSION_START' && sessionId !== newSessionId) {
        // Another tab is active
        if (existingSessionId && existingSessionId !== sessionId) {
          // This is a new tab with a different session; enforce single-tab rule
          toast(
            'You are already logged in on another tab. Redirecting to login.',
            'success'
          );
          clearSession();
          router.push('/login');
        } else {
          // This is the first tab; set its session
          setSessionActive('', newSessionId); // Assuming userId is not needed here
        }
      }

      if (type === 'SESSION_END') {
        router.push('/login');
        // Another tab closed; no action needed unless you want to allow new tabs
      }
    };

    return () => {
      broadcastChannel.postMessage({
        type: 'SESSION_END',
        sessionId: newSessionId
      });
      broadcastChannel.close();
    };
  }, [router, toast]);

  return null; // If used as a component
};

export default useSingleTabSession;
