import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { GetAllBranchTypesResponse } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';

//  query function for useQuery

async function getBranchType(
  toastActions: IToastActions
): Promise<GetAllBranchTypesResponse> {
  let result: GetAllBranchTypesResponse = {
    responseCode: '',
    responseDescription: '',
    branchTypes: []
  };
  try {
    const urlEndpoint = '/General/Branch/GetBranchType';

    const { data }: AxiosResponse<GetAllBranchTypesResponse> =
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

  return result;
}

export function useGetBrancheType(): GetAllBranchTypesResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllBranchTypesResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getBranchTypes],
    queryFn: () => getBranchType(toastActions)
  });

  return { ...data, isError, isLoading };
}
