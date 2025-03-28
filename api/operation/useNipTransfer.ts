import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { IToastActions } from '@/constants/types';
import { axiosInstance, nipAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { handleRedirect } from '@/utils';
import { MakeNipTransferType } from '@/schemas/schema-values/operation';
import { decryptData } from '@/utils/decryptData';
import { queryKeys } from '@/react-query/constants';

async function createNipTransfer(
  toastActions: IToastActions,
  body: MakeNipTransferType,
  token: string | null
): Promise<void> {
  try {
    const urlEndpoint = '/transaction/outward/transfer';

    const { data }: AxiosResponse<APIResponse> = await nipAxiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  } catch (errorResponse) {
    toast('Transfer Failed', 'Nip Error', 'error', toastActions);
  }
}

export function useNipTransfer(token: string | null) {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: MakeNipTransferType) =>
      createNipTransfer(toastActions, body, token),
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
