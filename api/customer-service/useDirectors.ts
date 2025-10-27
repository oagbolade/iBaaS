import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import {
  GenericResponse,
  GetDirectorByIdResponse,
  GetDirectorMandateDetailsesponse,
  GetDirectorsByCustomerIdResponse,
  IDirectorDetails,
  IDirectorMandate,
  SearchDirectorResponse
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import {
  CreateDirectorFormValues,
  CreateDirectorMandateFormValues,
  DeleteDirectorValues
} from '@/schemas/schema-values/customer-service';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

export async function filterDirectorsSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/customer-service/search/directors?page=${params?.page}&size=10`;

    const { data }: AxiosResponse<SearchDirectorResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'POST',
        data: {
          fullName: params?.fullName
        },
        headers: {
          'Tenant-ID': getStoredUser()?.companyCode || '',
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler({
      ...data,
      isSearch: true
    });

    if (environment === 'development') {
      toast(message, title, severity, toastActions);
    }

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler(
      { isSearch: true },
      errorResponse
    );
    toast(message, title, severity, toastActions);
  }

  return result;
}

async function createDirector(
  toastActions: IToastActions,
  body: CreateDirectorFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/CreateDirector';
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

    if (!SUCCESS_CODES.includes(data.responseCode)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

async function createDirectorMandate(
  toastActions: IToastActions,
  body: CreateDirectorMandateFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/CreateDirectorImg';
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

    if (!SUCCESS_CODES.includes(data.responseCode)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

export async function getDirectorById(
  toastActions: IToastActions,
  directorId: string
): Promise<GetDirectorByIdResponse> {
  let result: GetDirectorByIdResponse = {
    responseCode: '',
    responseDescription: '',
    directorDetails: {} as IDirectorDetails
  };

  try {
    const urlEndpoint = `/CustomerServices/GetDirectorsById?id=${directorId}`;

    const { data }: AxiosResponse<GetDirectorByIdResponse> =
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

export async function getDirectorsByCustomerId(
  toastActions: IToastActions,
  customerId: string
): Promise<GetDirectorsByCustomerIdResponse> {
  let result: GetDirectorsByCustomerIdResponse = {
    responseCode: '',
    responseDescription: '',
    directorDetails: [] as IDirectorDetails[]
  };

  try {
    const urlEndpoint = `/CustomerServices/GetDirectorsByCustomerId?customerId=${customerId}`;

    const { data }: AxiosResponse<GetDirectorsByCustomerIdResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);

    if (environment === 'development') {
      toast(message, title, severity, toastActions);
    }
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  if (
    result?.directorDetails === null ||
    result?.directorDetails === undefined
  ) {
    result.directorDetails = [];
  }

  return result;
}

export async function getDirectorMandateDetails(
  toastActions: IToastActions,
  customerId: string,
  directorId: string
): Promise<GetDirectorMandateDetailsesponse> {
  let result: GetDirectorMandateDetailsesponse = {
    responseCode: '',
    responseDescription: '',
    directorMandate: {} as IDirectorMandate
  };

  try {
    const urlEndpoint = `/CustomerServices/GetDirectorMandateDetails?customerid=${customerId}&directorid=${directorId}`;

    const { data }: AxiosResponse<GetDirectorMandateDetailsesponse> =
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

async function deleteDirectorMandate(
  toastActions: IToastActions,
  body: DeleteDirectorValues
): Promise<void> {
  try {
    const urlEndpoint = `/CustomerServices/DeleteDirectorMandate?customerid=${body.customerId}&directorId=${body.directorId}`;
    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'DELETE',
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

export function useGetDirectorMandateDetails(
  customerId: string,
  directorId: string
) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetDirectorMandateDetailsesponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDirectorMandateDetails, customerId, directorId],
    queryFn: () =>
      getDirectorMandateDetails(
        toastActions,
        decryptData(customerId) as string,
        decryptData(directorId) as string
      ),
    enabled: Boolean(customerId?.length > 0 || directorId?.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useDeleteDirectorMandate() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: DeleteDirectorValues) =>
      deleteDirectorMandate(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getDirectorMandateDetails]
      });
    }
  });

  return { mutate, isPending, isError, error };
}

export function useGetDirectorsByCustomerId(customerId: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetDirectorsByCustomerIdResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDirectorsByCustomerId, customerId],
    queryFn: () => getDirectorsByCustomerId(toastActions, customerId),
    enabled: Boolean(customerId?.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetDirectorById(directorId: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetDirectorByIdResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDirectorById, decryptData(directorId)],
    queryFn: () =>
      getDirectorById(toastActions, decryptData(directorId) as string),
    enabled: Boolean(directorId?.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateDirectorMandate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateDirectorMandateFormValues) =>
      createDirectorMandate(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getDirectorMandateDetails]
      });

      setTimeout(() => {
        handleRedirect(router, '/customer-service/director/');
      }, 2500);
    }
  });

  return { mutate, isPending, isError, error };
}

export function useCreateDirector() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateDirectorFormValues) =>
      createDirector(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.filterDirectorsSearch]
      });

      handleRedirect(router, '/customer-service/director/');
    }
  });

  return { mutate, isPending, isError, error };
}

export function useFilterDirectorsSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterDirectorsSearch,
      params?.fullName || '',
      params?.page || 1
    ],
    queryFn: () => filterDirectorsSearch(toastActions, params),
    enabled: Boolean((params?.fullName || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
