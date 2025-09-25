import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  GetAllTransactionTypeResponse,
  GetGenerateBatchNoResponse,
  IGenerateBatchNo,
  ITransactionType
} from '../ResponseTypes/operation';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { CreateBatchPostingFormValues } from '@/schemas/schema-values/operation';
import { handleRedirect } from '@/utils';

async function createBatchPosting(
  toastActions: IToastActions,
  body: CreateBatchPostingFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/BatchPosting';
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: [{ ...body }],
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
async function getTransactionType(
  toastActions: IToastActions
): Promise<GetAllTransactionTypeResponse> {
  let result: GetAllTransactionTypeResponse = {
    responseCode: '',
    responseDescription: '',
    details: [] as ITransactionType[]
  };

  try {
    const urlEndpoint = '/Operations/BatchPostTranType';

    const { data }: AxiosResponse<GetAllTransactionTypeResponse> =
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

async function getGenerateBatchNo(
  toastActions: IToastActions
): Promise<GetGenerateBatchNoResponse> {
  let result: GetGenerateBatchNoResponse = {
    responseCode: '',
    responseDescription: '',
    batchno: {} as IGenerateBatchNo
  };

  try {
    const urlEndpoint = '/Operations/GenerateBatchNo';

    const { data }: AxiosResponse<GetGenerateBatchNoResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useGetGenerateBatchNo(): GetGenerateBatchNoResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetGenerateBatchNoResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGenerateBatchNo],
    queryFn: () => getGenerateBatchNo(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetTransactionType(): GetAllTransactionTypeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllTransactionTypeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getTransactionType],
    queryFn: () => getTransactionType(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useCreateBatchPosting() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateBatchPostingFormValues) =>
      createBatchPosting(toastActions, body),
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
// Return the user object and auth methods
