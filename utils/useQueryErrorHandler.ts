'use client';
import { useToastMessage } from './useToastMessage';

export const useQueryErrorHandler = (error: unknown): void => {
  const { toast } = useToastMessage();
  const message =
    error instanceof Error
      ? // remove the initial 'Error: ' that accompanies many errors
        error.toString().replace(/^Error:\s*/, '')
      : 'error connecting to server';
  toast(message, 'error');
};
