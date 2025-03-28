import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import {
  CreateCashDepositFormValues,
  CreateReturnChequesFormValues
} from '@/schemas/schema-values/operation';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { getStoredUser } from '@/utils/user-storage';
import { handleRedirect } from '@/utils';
import { queryKeys } from '@/react-query/constants';

async function createReturnCheques(
  toastActions: IToastActions,
  body: CreateReturnChequesFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/CreateReturnChequeReversal';
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

export function useCreateReturnCheque() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateReturnChequesFormValues) =>
      createReturnCheques(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [[queryKeys.getAccountDetails]];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/operation/cheque/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
