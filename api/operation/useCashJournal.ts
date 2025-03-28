import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { CreateCashJournalFormValues } from '@/schemas/schema-values/operation';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { getStoredUser } from '@/utils/user-storage';
import { handleRedirect } from '@/utils';
import { queryKeys } from '@/react-query/constants';

async function createCashJournal(
  toastActions: IToastActions,
  body: CreateCashJournalFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/CashJournal';
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

    if (!SUCCESS_CODES.includes(data.responseCode as string)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

export function useCreateCashJournal() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCashJournalFormValues) =>
      createCashJournal(toastActions, body),
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
