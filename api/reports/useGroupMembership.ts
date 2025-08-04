import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { GroupMembershipResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getGroupMembership(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: GroupMembershipResponse = {} as GroupMembershipResponse;
  try {
    const queryParams = {
      branchCode: params?.branchID || '',
      officer: params?.officerCode || '',
      group: params?.groupId || '',
      pageNumber: params?.pageNumber ? String(params.pageNumber) : '1',
      pageSize: params?.pageSize ? String(params.pageSize) : '10',
      getAll: String(params?.getAll || 'false'),
      searchWith: params?.searchWith || ''
    };
    const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/GetGroupMembership?${new URLSearchParams(queryParams)}`;

    const { data }: AxiosResponse<GroupMembershipResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });
    const { message, title, severity } = globalErrorHandler({
      ...data
    });
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  if (
    result?.groupMembershipList === null ||
    result?.groupMembershipList === undefined
  ) {
    result.groupMembershipList = [];
  }
  return result;
}

export function useGetGroupMembership(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GroupMembershipResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.groupMembership,
      params?.branchID || '',
      params?.searchWith || '',
      params?.groupId || '',
      params?.officerCode || '',
      params?.getAll || false,
      params?.pageSize || 10,
      params?.page || 1
    ],
    queryFn: () => getGroupMembership(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        params?.searchWith ||
        params?.groupId ||
        params?.officerCode
    )
  });
  return { ...data, isError, isLoading };
}
