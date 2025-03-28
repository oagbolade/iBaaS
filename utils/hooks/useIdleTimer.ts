import { useEffect, useState } from 'react';
import { AlertColor } from '@mui/material';
import { toast } from '@/utils/toast';
import { IToastActions } from '@/constants/types';

const useIdleTimer = (timeout: number, onIdle: () => void, toastActions: IToastActions) => {
  const [isIdle, setIsIdle] = useState(false);

  const toastMessage = {
    title: 'Idleness Warning',
    severity: 'error',
    idleMessage: {
      message: 'You are idle. You will be logged out soon.'
    }
  };

  useEffect(() => {
    let idleTimer: number;

    const resetTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        setIsIdle(true);
        
        toast(
          toastMessage.idleMessage.message,
          toastMessage.title,
          toastMessage.severity as AlertColor,
          toastActions
        );

        const delaySignOut = 4000;
        
        setTimeout(() => {
          onIdle();
        }, delaySignOut);
      }, timeout);
    };

    const handleActivity = () => {
      if (isIdle) setIsIdle(false);
      resetTimer();
    };

    // Event listeners to detect user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    // Initialize the timer
    resetTimer();

    // Cleanup event listeners and timer on unmount
    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [timeout, onIdle, isIdle]);

  return isIdle;
};

export default useIdleTimer;
