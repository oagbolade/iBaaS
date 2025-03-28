import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  IUsers,
  SearchStaffResponse
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';

export async function searchStaff(
  toastActions: IToastActions,
  staffname: string
): Promise<SearchStaffResponse> {
  let result: SearchStaffResponse = {
    responseCode: '',
    responseDescription: '',
    users: [] as IUsers[]
  };

  try {
    const urlEndpoint = `/General/Product/SearchStaffByName?staffname=${staffname}`;

    const { data }: AxiosResponse<SearchStaffResponse> = await axiosInstance({
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

  return result;
}

export function useSearchStaff(staffname: string): SearchStaffResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as SearchStaffResponse[];

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.searchStaff, staffname],
    queryFn: () => searchStaff(toastActions, staffname),
    enabled: Boolean(staffname.length > 0)
  });

  return { ...data, isError, isLoading };
}
