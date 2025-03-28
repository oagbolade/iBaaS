import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApprovePendingRequestResponse } from '../ResponseTypes/loans';
import { IToastActions } from '@/constants/types';
import { approvePendingRequestFormValues } from '@/schemas/schema-values/requests';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { handleRedirect } from '@/utils';

async function approvePendingRequest(
  toastActions: IToastActions,
  body: approvePendingRequestFormValues
): Promise<ApprovePendingRequestResponse> {
  try {
    const urlEndpoint = `/Auth/AuthPost/?comment=${body.comment}&id=${body.id}`;
    const { data }: AxiosResponse<ApprovePendingRequestResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);
    return data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

export function useApprovePendingRequest() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: approvePendingRequestFormValues) =>
      approvePendingRequest(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.fetchAllUserRequest],
        [queryKeys.fetchPendingRequest],
        [queryKeys.fetchRejectedRequest]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/requests/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
