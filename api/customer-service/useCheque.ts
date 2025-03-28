import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  GenericResponse,
  GetAllChequeBooksResponse,
  GetChequeInfoResponse,
  ICheckBooks,
  IChequeInfo
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  CreateRangeChequeFormValues,
  EditChequeBookFormValues
} from '@/schemas/schema-values/customer-service';
import { handleRedirect } from '@/utils';

// TODO: remove when infosight makes the response uniform
interface ResponseMessage {
  responseMessage: string;
}

type Response = GenericResponse & ResponseMessage;

export async function createRangeCheque(
  toastActions: IToastActions,
  body: CreateRangeChequeFormValues
): Promise<GenericResponse> {
  let result: Response = {
    responseCode: '',
    responseDescription: '',
    responseMessage: ''
  };

  try {
    const urlEndpoint = '/CustomerServices/RangeCheque';

    const { data }: AxiosResponse<Response> = await axiosInstance({
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
    toast(message, title, severity, toastActions);
    if (!SUCCESS_CODES.includes(data.responseCode || '')) {
      throw new Error(message);
    }

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }

  return result;
}

export async function editChequeBook(
  toastActions: IToastActions,
  body: EditChequeBookFormValues
): Promise<GenericResponse> {
  let result: Response = {
    responseCode: '',
    responseDescription: '',
    responseMessage: ''
  };

  try {
    const urlEndpoint = '/CustomerServices/EditChequeBook';

    const { data }: AxiosResponse<Response> = await axiosInstance({
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
    if (!SUCCESS_CODES.includes(data.responseCode || '')) {
      throw new Error(message);
    }

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }

  return result;
}

async function getChequeInfo(
  toastActions: IToastActions
): Promise<GetChequeInfoResponse> {
  let result: GetChequeInfoResponse = {
    responseCode: '',
    responseDescription: '',
    checqueInfo: [] as IChequeInfo[]
  };

  try {
    const urlEndpoint = '/CustomerServices/FetchChequeInfo';

    const { data }: AxiosResponse<GetChequeInfoResponse> = await axiosInstance({
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

async function getAllChequesBooks(
  toastActions: IToastActions
): Promise<GetAllChequeBooksResponse> {
  let result: GetAllChequeBooksResponse = {
    responseCode: '',
    responseDescription: '',
    checkbooks: [] as ICheckBooks[]
  };

  try {
    const urlEndpoint = '/Configuration/Chequebook/GetAllChequeBook';

    const { data }: AxiosResponse<GetAllChequeBooksResponse> =
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

export function useEditChequeBook(urlState: string | null = null) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: EditChequeBookFormValues) =>
      editChequeBook(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllChequesBooks]
      });

      if (urlState === 'financeMgt') {
        handleRedirect(router, '/finance/account/');
      } else {
        handleRedirect(router, '/customer-service/customer/');
      }
    }
  });

  return { mutate, isPending, isError, error };
}

export function useCreateRangeCheque(urlState: string | null = null) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateRangeChequeFormValues) =>
      createRangeCheque(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.filterCustomerAccountSearch]
      });

      if (urlState === 'financeMgt') {
        handleRedirect(router, '/finance/account/');
      } else {
        handleRedirect(router, '/customer-service/customer/');
      }
    }
  });

  return { mutate, isPending, isError, error };
}

export function useGetAllChequeBooks(): GetAllChequeBooksResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllChequeBooksResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllChequesBooks],
    queryFn: () => getAllChequesBooks(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetChequeInfo(): GetChequeInfoResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetChequeInfoResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getChequeInfo],
    queryFn: () => getChequeInfo(toastActions)
  });

  return { ...data, isError, isLoading };
}
