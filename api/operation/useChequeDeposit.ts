import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { CreateChequeDepositFormValues } from '@/schemas/schema-values/operation';
import { handleRedirect } from '@/utils';
import { queryKeys } from '@/react-query/constants';

async function createChequeDeposit(
  toastActions: IToastActions,
  body: CreateChequeDepositFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/ChequeDeposit';
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

async function createForwardtoAppOffChequeDep(
  toastActions: IToastActions,
  body: CreateChequeDepositFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/ForwardtoAppOffChequeDep';
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
export function useForwardtoAppOffChequeDep() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateChequeDepositFormValues) =>
      createForwardtoAppOffChequeDep(toastActions, body),
    onSuccess: () => {
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

export function useCreateChequeDeposit() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateChequeDepositFormValues) =>
      createChequeDeposit(toastActions, body),
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

// Return the user object and auth methods
