import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ICompany, UseGetAllCompanyResponse } from '../ResponseTypes/setup';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { CreateCompanyFormValues } from '@/schemas/schema-values/setup';
import { handleRedirect } from '@/utils';
import { queryKeys } from '@/react-query/constants';
import { decryptData } from '@/utils/decryptData';

async function updateCompany(
  toastActions: IToastActions,
  body: CreateCompanyFormValues,
  code: string | null = null
): Promise<void> {
  try {
    const urlEndpoint = `/Configuration/Company/UpdateCompany?code=${code}`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'PUT',
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

async function getCompanyById(
  toastActions: IToastActions
): Promise<UseGetAllCompanyResponse> {
  let result: UseGetAllCompanyResponse = {
    responseCode: '',
    responseDescription: '',
    bank: {} as ICompany
  };

  try {
    const urlEndpoint = '/Configuration/Company/GetCompany';

    const { data }: AxiosResponse<UseGetAllCompanyResponse> =
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
async function getAllCompany(
  toastActions: IToastActions
): Promise<UseGetAllCompanyResponse> {
  let result: UseGetAllCompanyResponse = {
    responseCode: '',
    responseDescription: '',
    company: [] as ICompany[]
  };

  try {
    const urlEndpoint = '/Configuration/Company/GetAllCompany';

    const { data }: AxiosResponse<UseGetAllCompanyResponse> =
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
export function useGetAllCompany(): UseGetAllCompanyResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetAllCompanyResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCompanyById],
    queryFn: () => getAllCompany(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetCompanyByCode(): UseGetAllCompanyResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetAllCompanyResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCompanyById],
    queryFn: () => getCompanyById(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useCreateCompany(code: string | null = null) {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCompanyFormValues) =>
      updateCompany(toastActions, body, code),
    onSuccess: () => {
      handleRedirect(router, '/setup/company/');
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
