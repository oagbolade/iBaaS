'use client'; // Ensure this runs only on the client
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertColor } from '@mui/material';
import { toast } from './toast';
import {
  generateSessionId,
  getBroadcastChannel
} from './user-storage/broadcastChannel';
import { IToastActions } from '@/constants/types';

export function useSingleTabSession(toastActions: IToastActions) {
  const router = useRouter();
  const [isSessionValid, setIsSessionValid] = useState<boolean | null>(null); // Track session validity
  const SESSION_KEY = 'active_session_id';
  const toastMessage = {
    title: 'Session Active Warning',
    severity: 'error',
    idleMessage: {
      message: 'Session active in another tab. This tab will be logged out.'
    }
  };
  // Generate a unique session ID for this tab
  const sessionId = '80hjsismdd832hj'; // Ensure generateSessionId generates a unique ID

  // Perform initial session check synchronously
  if (typeof window !== 'undefined') {
    const existingSessionId = localStorage.getItem('active_session_id');
    if (existingSessionId && existingSessionId !== sessionId) {
      // Another tab has an active session; redirect immediately
      toast(
        toastMessage.idleMessage.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      router.push('/login');
      getBroadcastChannel()?.close();
      return { isSessionValid: false }; // Return early to prevent rendering
    }
    // Set this tab's session if no active session exists
    if (!existingSessionId) {
      localStorage.setItem(SESSION_KEY, sessionId);
      setIsSessionValid(true);
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server
    const channel = new BroadcastChannel('auth_channel');

    // Broadcast that this tab has started a session
    getBroadcastChannel()?.postMessage({
      type: 'SESSION_START',
      sessionId
    });

    // Listen for new sessions from other tabs
    channel.onmessage = (event) => {
      if (
        event.data.type === 'SESSION_START' &&
        event.data.sessionId !== sessionId
      ) {
        // Another tab started a session; log out this tab
        toast(
          toastMessage.idleMessage.message,
          toastMessage.title,
          toastMessage.severity as AlertColor,
          toastActions
        );
        router.push('/login');
        getBroadcastChannel()?.close();
      }
    };

    // Clean up on unmount
    return () => {
      if (localStorage.getItem('active_session_id') === sessionId) {
        localStorage.removeItem('active_session_id'); // Clear only if this tab owns the session
      }
      getBroadcastChannel()?.close();
    };
  }, [router, toastActions, sessionId]);

  return { isSessionValid };
}
