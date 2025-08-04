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
import { ILoanMaturityResponse } from '@/api/ResponseTypes/reports';
import { toast } from '@/utils/toast';
import { REPORT_BASE_URL } from '@/axiosInstance/constants';

export async function getMaturityLoan(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: ILoanMaturityResponse = {} as ILoanMaturityResponse;
  try {
    const queryParams: Record<string, string> = {
      branchcode: params?.branchID || '',
      productcode: params?.prodCode || '',
      pageNumber: params?.pageNumber ? String(params.pageNumber) : '1',
      pageSize: params?.pageSize ? String(params.pageSize) : '10',
      getAll: String(params?.getAll || 'false'),
      startdate: params?.startDate || '',
      enddate: params?.endDate || '',
      searchWith: params?.searchWith || ''
    };
    const urlEndpoint = `${REPORT_BASE_URL}/ReportServices/LoanMaturityReport?${new URLSearchParams(queryParams)}`;
    const { data }: AxiosResponse<ILoanMaturityResponse> = await axiosInstance({
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
    if (data.loanMaturityList === null) {
      data.loanMaturityList = [];
    }
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  
  if (
    result?.loanMaturityList === null ||
    result?.loanMaturityList === undefined
  ) {
    result.loanMaturityList = [];
  }

  return result;
}

export function useGetMaturityLoan(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ILoanMaturityResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.maturityLoan,
      params?.branchID,
      params?.prodCode,
      params?.searchWith,
      params?.pageNumber,
      params?.pageSize,
      params?.getAll,
      params?.startDate,
      params?.endDate
    ],
    queryFn: () => getMaturityLoan(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.prodCode || '').length > 0 ||
        (params?.startDate || '').length > 0 ||
        (params?.endDate || '').length > 0 ||
        (params?.searchWith || '').length > 0
    )
  });
  return { ...data, isError, isLoading };
}
