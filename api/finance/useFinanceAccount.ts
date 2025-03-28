import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { GenericResponse } from '../ResponseTypes/customer-service';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { IToastActions } from '@/constants/types';
import { ISearchParams } from '@/app/api/search/route';
import { queryKeys } from '@/react-query/constants';
import { ClassifyAccountFormValues } from '@/schemas/schema-values/customer-service';
import { handleRedirect } from '@/utils';

import { SearchFinanceAccountResponse } from '@/api/ResponseTypes/finance';

import { toast } from '@/utils/toast';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';

export async function filterFinanceAccount(
  toastActions: IToastActions,
  params: ISearchParams | null
) {
  let result: SearchFinanceAccountResponse = {} as SearchFinanceAccountResponse;
  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/customer-service/search?action=accounts&status=${params?.status}&branchCode=${params?.branchID}&page=${params?.page}&size=10&accountName=${params?.fullName}`;

    const { data }: AxiosResponse<SearchFinanceAccountResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler({
      ...data,
      isSearch: true
    });
    toast(message, title, severity, toastActions);
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

export function useFilterFinanceAccountSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterFinanceAccount,
      params?.branchID || '',
      params?.status || '',
      params?.fullName || '',
      params?.page || 1
    ],
    queryFn: () => filterFinanceAccount(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.status || '').length > 0 ||
        (params?.fullName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

// get general ledger section
export async function filterGeneralLedgerSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/admin/search/generalLedger?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchResultsGenericResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          branchCode: params?.branchID,
          acctName: params?.accountName,
          glnumber: params?.glNumber
        },
        headers: {
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler({
      ...data,
      isSearch: true
    });

    toast(message, title, severity, toastActions);
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

export function useFilterGeneralLedgerSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterGeneralLedgerSearch,
      params?.glNumber || '',
      params?.branchID || '',
      params?.accountName || '',
      params?.page || 1
    ],
    queryFn: () => filterGeneralLedgerSearch(toastActions, params),
    enabled: Boolean(
      (params?.accountName || '').length > 0 ||
        (params?.branchID || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

// account classify section
export async function addAccountClassify(
  toastActions: IToastActions,
  body: ClassifyAccountFormValues
): Promise<GenericResponse> {
  let result: GenericResponse = {
    responseCode: '',
    responseDescription: ''
  };

  try {
    const urlEndpoint = '/Admin/ClassifyAccount';
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

export function useAddAccountClassify() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: ClassifyAccountFormValues) =>
      addAccountClassify(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterCustomerSearch],
        [queryKeys.getAccountDetails],
        [queryKeys.filterCustomerAccountSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/finance/account/');
    }
  });

  return { mutate, isPending, isError, error };
}
