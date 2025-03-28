import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  GenericResponse,
  GetLienReasonResponse,
  GetAllLienResponse,
  ILien,
  ILienReason,
  GetLienDetailResponse,
  ILienDetail,
  ILienExists,
  ILienAccountName,
  ILienModel
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  AddCustomerLienFormValues,
  ReleaseLienFormValues
} from '@/schemas/schema-values/customer-service';
import { decryptData } from '@/utils/decryptData';
import { handleRedirect } from '@/utils';

export async function addCustomerLien(
  toastActions: IToastActions,
  body: AddCustomerLienFormValues
): Promise<GenericResponse> {
  let result: GenericResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = '/CustomerServices/CreateLien';

    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
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

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export async function releaseLien(
  toastActions: IToastActions,
  body: ReleaseLienFormValues
): Promise<GenericResponse> {
  let result: GenericResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = '/CustomerServices/Product/ReleaseLien';

    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
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

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

async function getAllLien(
  toastActions: IToastActions
): Promise<GetAllLienResponse> {
  let result: GetAllLienResponse = {
    responseCode: '',
    responseDescription: '',
    allLiens: [] as ILien[]
  };

  try {
    const urlEndpoint = '/CustomerServices/GetAllLien';

    const { data }: AxiosResponse<GetAllLienResponse> = await axiosInstance({
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

async function getLienReason(
  toastActions: IToastActions,
  lientype: string
): Promise<GetLienReasonResponse> {
  let result: GetLienReasonResponse = {
    responseCode: '',
    responseDescription: '',
    lienReason: [] as ILienReason[]
  };

  try {
    const urlEndpoint = `/CustomerServices/CustomerService/GetLienReason?lientype=${lientype}`;

    const { data }: AxiosResponse<GetLienReasonResponse> = await axiosInstance({
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

async function getLienDetail(
  toastActions: IToastActions,
  accountnumber: string
): Promise<GetLienDetailResponse> {
  let result: GetLienDetailResponse = {
    responseCode: '',
    responseDescription: '',
    liendetail: [] as ILienDetail[],
    lienexist: {} as ILienExists,
    accName: {} as ILienAccountName,
    lienModel: {} as ILienModel
  };

  try {
    const urlEndpoint = `/CustomerServices/CustomerService/GetLienDetail?accountnumber=${accountnumber}`;

    const { data }: AxiosResponse<GetLienDetailResponse> = await axiosInstance({
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

export function useAddCustomerLien() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: AddCustomerLienFormValues) =>
      addCustomerLien(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getAllLien],
        [queryKeys.getLienDetail]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/customer-service/customer/');
    }
  });

  return { mutate, isPending, isError, error };
}

export function useReleaseLien() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: ReleaseLienFormValues) =>
      releaseLien(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getAllLien],
        [queryKeys.getLienDetail]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    }
  });

  return { mutate, isPending, isError, error };
}

export function useGetAllLien(): GetAllLienResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllLienResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLien],
    queryFn: () => getAllLien(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetLienReason(lienType: string): GetLienReasonResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetLienReasonResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLienReason, decryptData(lienType)],
    queryFn: () => getLienReason(toastActions, decryptData(lienType) as string),
    enabled: Boolean(lienType.toString().length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetLienDetail(accountNumber: string): GetLienDetailResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetLienDetailResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getLienDetail, decryptData(accountNumber)],
    queryFn: () =>
      getLienDetail(toastActions, decryptData(accountNumber) as string)
  });

  return { ...data, isError, isLoading };
}
