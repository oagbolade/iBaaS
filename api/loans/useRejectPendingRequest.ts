import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import { RejectPendingRequestResponse } from '../ResponseTypes/loans';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { rejectPendingRequestFormValues } from '@/schemas/schema-values/requests';
import { handleRedirect } from '@/utils';
import { queryKeys } from '@/react-query/constants';

async function rejectPendingRequest(
  toastActions: IToastActions,
  body: rejectPendingRequestFormValues
): Promise<RejectPendingRequestResponse> {
  let result: RejectPendingRequestResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = `/Auth/RejectAuth/?comments=${body.comments}&id=${body.id}`;

    const { data }: AxiosResponse<RejectPendingRequestResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useRejectPendingRequest(): RejectPendingRequestResponse {
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: rejectPendingRequestFormValues) =>
      rejectPendingRequest(toastActions, body),
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
