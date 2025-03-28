import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { IToastActions } from '@/constants/types';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { handleRedirect } from '@/utils';
import { FundTransferFormValues } from '@/schemas/schema-values/operation';
import { queryKeys } from '@/react-query/constants';

async function createFundsTransfer(
  toastActions: IToastActions,
  body: FundTransferFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/FundsTransferInterface';
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
async function createForwardTransferApprovingOfficer(
  toastActions: IToastActions,
  body: FundTransferFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/Opearions/ForwardTransferApprovingOfficer';
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
export function useForwardTransferApprovingOffice(): APIResponse {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: FundTransferFormValues) =>
      createForwardTransferApprovingOfficer(toastActions, body),
    onSuccess: () => {
      handleRedirect(router, '/operation/transfer/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
export function useFundsTransfer(): APIResponse {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: FundTransferFormValues) =>
      createFundsTransfer(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [[queryKeys.getAccountDetails]];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/operation/transfer/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
