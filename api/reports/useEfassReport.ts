import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  EfassReportResponse,
  IEfassReport,
  TrailBalanceGroupResponse
} from '../ResponseTypes/reports';
import { axiosInstance, reportsAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { toast } from '@/utils/toast';
import { getCurrentIsoDate } from '@/utils/getCurrentDate';

export async function getEfassReport(
  toastActions: IToastActions,
  body: IEfassReport
): Promise<EfassReportResponse | null> {
  try {
    const urlEndpoint = '/EfassReport';
    const { data }: AxiosResponse<EfassReportResponse> =
      await reportsAxiosInstance.post(urlEndpoint, {
        body: { ...body },
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
export function useEfassReport() {
  const toastActions = useContext(ToastMessageContext);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: IEfassReport) => getEfassReport(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [[queryKeys.getEfassReport]];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
