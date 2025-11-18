import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  IGlSubGroupResponse,
  GLAccountsByClassCodeResponse,
  IGlMainGroupResponse
} from '../ResponseTypes/reports';
import { reportsAxiosInstance } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { getStoredUser } from '@/utils/user-storage';
import { ISearchParams } from '@/app/api/search/route';

async function fetchGlMainGroupReport(
  params: ISearchParams,
  toastActions: IToastActions
): Promise<IGlMainGroupResponse | null> {
  try {
    const urlEndpoint = '/api/ReportServices/GLMainGroupReport';
    const { data }: AxiosResponse<IGlMainGroupResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          getAll: params.getAll || false,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    return data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    return null;
  }
}

export function useGetGlMainGroupReport(
  params: ISearchParams
): IGlMainGroupResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IGlMainGroupResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.glSubGroupReport,
      params?.pageNumber || 10,
      params?.page || 1
    ],
    queryFn: () => fetchGlMainGroupReport(params, toastActions),
    enabled: Boolean(
      params?.pageNumber || params.pageSize || params?.page || params?.page
    )
  });

  return {
    ...fallback,
    ...data,
    isError,
    isLoading
  };
}

async function fetchGlSubGroupReport(
  params: ISearchParams,
  toastActions: IToastActions
): Promise<IGlSubGroupResponse | null> {
  try {
    const urlEndpoint = 'api/ReportServices/GlSubGroupReport';
    const { data }: AxiosResponse<IGlSubGroupResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          NodeCode: params.nodeCode,
          getAll: params.getAll || false,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    return data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    return null;
  }
}

export function useGetGlSubGroupReport(
  params: ISearchParams
): IGlSubGroupResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as IGlSubGroupResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.glSubGroupReport,
      params?.nodeCode || '',
      params?.getAll || false,
      params?.pageNumber || 10,
      params?.getAll || 1,
      params?.pageSize || 1
    ],
    queryFn: () => fetchGlSubGroupReport(params, toastActions),
    enabled: Boolean(params?.nodeCode || params?.getAll)
  });

  return { ...fallback, ...data, isError, isLoading };
}

async function fetchGlNodeClassReport(
  params: ISearchParams,
  toastActions: IToastActions
): Promise<GLAccountsByClassCodeResponse | null> {
  try {
    const urlEndpoint = 'api/ReportServices/GLAccountsByClassCode';
    const { data }: AxiosResponse<GLAccountsByClassCodeResponse> =
      await reportsAxiosInstance.get(urlEndpoint, {
        params: {
          Gl_ClassCode: params.gl_ClassCode,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          getAll: params.getAll || false,
          searchWith: params.searchWith,
          branchCode: params.branchID
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    return data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    return null;
  }
}

export function useGlNodeClassReport(
  params: ISearchParams
): GLAccountsByClassCodeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GLAccountsByClassCodeResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.glSubGroupReport,
      params?.branchID || '',
      params?.searchWith || '',
      params?.gl_ClassCode || '',
      params?.pageSize || 10,
      params?.page || 1,
      params?.pageNumber || 10,
      params?.getAll || 10
    ],
    queryFn: () => fetchGlNodeClassReport(params, toastActions),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        params?.searchWith ||
        params?.gl_ClassCode ||
        params?.pageNumber ||
        params.pageSize
    )
  });

  return { ...fallback, ...data, isError, isLoading };
}
