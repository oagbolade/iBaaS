import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { CreateCashDepositFormValues } from '@/schemas/schema-values/operation';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { getStoredUser } from '@/utils/user-storage';
import { queryKeys } from '@/react-query/constants';
import { handleRedirect } from '@/utils';

async function createCashDeposit(
  toastActions: IToastActions,
  body: CreateCashDepositFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/CashDeposit';
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

async function createForwardtoAppOffCashDep(
  toastActions: IToastActions,
  body: CreateCashDepositFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/ForwardtoAppOffCashDep';
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

export function useCreateForwardtoAppOffCashDep() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCashDepositFormValues) =>
      createForwardtoAppOffCashDep(toastActions, body),
    onSuccess: () => {
      handleRedirect(router, '/operation/cash/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
export function useCreateCashDeposit() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCashDepositFormValues) =>
      createCashDeposit(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [[queryKeys.getAccountDetails]];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/operation/cash/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
