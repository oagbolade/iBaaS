import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { reportsAxiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { StatementOfAccountResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';

export async function getStatementOfAccount(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: StatementOfAccountResponse = {} as StatementOfAccountResponse;
  try {
    const urlEndpoint = '/api/ReportServices/Statements';

    const { data }: AxiosResponse<StatementOfAccountResponse> = await reportsAxiosInstance.get(
      urlEndpoint,
      {
        params: {
          startdate: params?.startDate,
          enddate: params?.endDate,
          searchid: `${getStoredUser()?.profiles?.userid}`,
          Reversal: `${1}`,
          accountNumber: params?.accountNumber,
          accttype: params?.productCode,
          pageSize: params?.pageSize || 10,
          pageNumber: params?.pageNumber || 1,
          getAll: params?.getAll || false
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler({
      ...data
    });
    toast(message, title, severity, toastActions);

    if (!data.rptStatementList.pagedRecords) {
      data.rptStatementList.pagedRecords = [];
    }
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetStatementOfAccount(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as StatementOfAccountResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.statementOfAccount,
      params?.accountNumber || '',
      params?.status?.toString || '',
      params?.branchID?.toString || '',
      params?.productCode || '',
      params?.startDate || '',
      params?.endDate || '',
      params?.page || 1
    ],
    queryFn: () => getStatementOfAccount(toastActions, params || {}),
    enabled: Boolean(
      (params?.accountNumber || '').length > 0 ||
      (params?.status?.toString || '').length > 0 ||
      (params?.productCode?.toString || '').length > 0 ||
      (params?.branchID?.toString || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
