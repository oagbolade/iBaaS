import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  GetAllClearingBanksResponse,
  IGetClearingBank,
  IGetZone
} from '../ResponseTypes/operation';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  CreateInWardClearingFormValues,
  CreateOutWardClearingFormValues,
  IClearingParams
} from '@/schemas/schema-values/operation';
import { handleRedirect } from '@/utils';
import { queryKeys } from '@/react-query/constants';

async function createInwardClearing(
  toastActions: IToastActions,
  body: CreateInWardClearingFormValues,
  params: IClearingParams | null
): Promise<void> {
  try {
    const urlEndpoint = `/Operations/Operations/InwardClearing?clrbank=${params?.bankcode}&clrtype=${params?.cleartype}`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body, ...params },
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

async function createFwdAppOfficerInwardClearing(
  toastActions: IToastActions,
  body: CreateInWardClearingFormValues,
  params: IClearingParams | null
): Promise<void> {
  try {
    const urlEndpoint = `/Operations/Operations/FwdAppOfficerClearing2?clrbank=${params?.bankcode}&clrtype=${params?.cleartype}`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body, ...params },
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
async function createFWdAppOfficerOutwardClearing(
  toastActions: IToastActions,
  body: CreateOutWardClearingFormValues,
  params: IClearingParams | null
): Promise<void> {
  try {
    const urlEndpoint = `/Operations/Operations/FwdAppOfficerClearing1?clrbank=${params?.bankcode}`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body, ...params },
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
async function createOutwardClearing(
  toastActions: IToastActions,
  body: CreateOutWardClearingFormValues,
  params: IClearingParams | null
): Promise<void> {
  try {
    const urlEndpoint = `/Operations/Operations/OutwardClearing?clrbank=${params?.bankcode}`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body, ...params },
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

async function getZones(
  toastActions: IToastActions
): Promise<GetAllClearingBanksResponse> {
  let result: GetAllClearingBanksResponse = {
    responseCode: '',
    responseDescription: '',
    zones: [] as IGetZone[]
  };

  try {
    const urlEndpoint = '/Configuration/Zone/GetZone';

    const { data }: AxiosResponse<GetAllClearingBanksResponse> =
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
async function getClearingBank(
  toastActions: IToastActions
): Promise<GetAllClearingBanksResponse> {
  let result: GetAllClearingBanksResponse = {
    responseCode: '',
    responseDescription: '',
    clearBanks: [] as IGetClearingBank[]
  };

  try {
    const urlEndpoint = '/General/Product/GetClearingBanks';

    const { data }: AxiosResponse<GetAllClearingBanksResponse> =
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
export function useClearingBank(): GetAllClearingBanksResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllClearingBanksResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getClearingBank],
    queryFn: () => getClearingBank(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetZone(): GetAllClearingBanksResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllClearingBanksResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getZones],
    queryFn: () => getZones(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useCreateFwdAppOfficerOutWardClearing(
  params: IClearingParams | null
) {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateOutWardClearingFormValues) =>
      createFWdAppOfficerOutwardClearing(toastActions, body, params),
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

export function useCreateOutwardClearing(params: IClearingParams | null) {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateOutWardClearingFormValues) =>
      createOutwardClearing(toastActions, body, params),
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
export function useCreateFwdAppOfficerInWardClearing(
  params: IClearingParams | null
) {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateInWardClearingFormValues) =>
      createFwdAppOfficerInwardClearing(toastActions, body, params),
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
export function useCreateInwardClearing(params: IClearingParams | null) {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateInWardClearingFormValues) =>
      createInwardClearing(toastActions, body, params),
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
