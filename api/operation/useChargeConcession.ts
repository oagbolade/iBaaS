import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IChargeConcessionType,
  UseGetChargeConcessionResponse
} from '../ResponseTypes/operation';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { CreateChargeConcessionFormValues } from '@/schemas/schema-values/operation';
import { handleRedirect } from '@/utils';

async function createChargeConcession(
  toastActions: IToastActions,
  body: CreateChargeConcessionFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/CreateChargeConcession';
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

async function getChargeConcession(
  toastActions: IToastActions
): Promise<UseGetChargeConcessionResponse> {
  let result: UseGetChargeConcessionResponse = {
    responseCode: '',
    responseDescription: '',
    charges: [] as IChargeConcessionType[]
  };

  try {
    const urlEndpoint = '/Configuration/GetAllCharges';

    const { data }: AxiosResponse<UseGetChargeConcessionResponse> =
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

export function useGetChargeConcession(): UseGetChargeConcessionResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetChargeConcessionResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getChargeConcession],
    queryFn: () => getChargeConcession(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useCreateChargeConcession() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateChargeConcessionFormValues) =>
      createChargeConcession(toastActions, body),
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
