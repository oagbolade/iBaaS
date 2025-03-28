import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  GetAllCounterCheqNo,
  ICounterCheqNo
} from '../ResponseTypes/operation';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { CreateChequeWithdrawalFormValues } from '@/schemas/schema-values/operation';
import { handleRedirect } from '@/utils';
import { queryKeys } from '@/react-query/constants';
import { decryptData } from '@/utils/decryptData';

async function createChequeWithdrawal(
  toastActions: IToastActions,
  body: CreateChequeWithdrawalFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/ChequeWithdraw';
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

async function getCounterCheqNo(
  toastActions: IToastActions,
  Accountnumber: string | null
): Promise<GetAllCounterCheqNo> {
  let result: GetAllCounterCheqNo = {
    responseCode: '',
    responseDescription: '',
    nextCounterCheqNo: {} as ICounterCheqNo
  };

  try {
    const urlEndpoint = `/Operations/Opearions/GetCounterCheqNo?Accountnumber=${Accountnumber}`;

    const { data }: AxiosResponse<GetAllCounterCheqNo> = await axiosInstance({
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
export function useGetCounterCheqNo(
  Accountnumber: string | null
): GetAllCounterCheqNo {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllCounterCheqNo;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCounterCheqNo, Accountnumber],
    queryFn: () => getCounterCheqNo(toastActions, Accountnumber),
    enabled: Boolean((Accountnumber || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateChequeWithdrawal() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateChequeWithdrawalFormValues) =>
      createChequeWithdrawal(toastActions, body),
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
