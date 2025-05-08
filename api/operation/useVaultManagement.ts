import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { axiosInstance, environment } from '@/axiosInstance';
import { IToastActions } from '@/constants/types';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { VaultManagementValues } from '@/schemas/schema-values/operation';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { getStoredUser } from '@/utils/user-storage';
import { handleRedirect } from '@/utils';
import { UseGlAndBookBalanceDetails } from '@/api/ResponseTypes/general';
import { queryKeys } from '@/react-query/constants';
import { decryptData } from '@/utils/decryptData';

async function createVaultManagement(
  toastActions: IToastActions,
  body: VaultManagementValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/VaultPost';
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
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
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

export function useCreateVaultManagement() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: VaultManagementValues) =>
      createVaultManagement(toastActions, body),
    onSuccess: () => {
      handleRedirect(router, '/operation/management/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

async function forwardToApprovingOfficer(
  toastActions: IToastActions,
  body: VaultManagementValues
): Promise<void> {
  try {
    const urlEndpoint = '/Operations/ForwardToAppOfficerVault';
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
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
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

export function useForwardToApprovingOfficer() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: VaultManagementValues) =>
      forwardToApprovingOfficer(toastActions, body),
    onSuccess: () => {
      handleRedirect(router, '/operation/management/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export async function getGldetailsByBranchCode(
  toastActions: IToastActions,
  code: string
): Promise<UseGlAndBookBalanceDetails> {
  let result: UseGlAndBookBalanceDetails = {
    responseCode: '',
    responseDescription: '',
    glAccounts: []
  };

  try {
    const urlEndpoint = `/Admin/GetGLAccountByBranchCode?branchCode=${code}`;
    const { data }: AxiosResponse<UseGlAndBookBalanceDetails> =
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

export function useGetGldetailsByBranchCode(
  branchCode: string
): UseGlAndBookBalanceDetails {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGlAndBookBalanceDetails;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.glDetail, branchCode],
    queryFn: () => getGldetailsByBranchCode(toastActions, branchCode),
    enabled: Boolean((branchCode || '').length > 0)
  });
  return { ...data, isError, isLoading };
}

export interface IGDetails {
  glnumber: string;
  bkbalance: number;
}

export async function getGldetailsByBranchCodeAndUserId(
  toastActions: IToastActions,
  code: string
): Promise<IGDetails> {
  let result: IGDetails = {
    glnumber: '',
    bkbalance: 0
  };

  try {
    const urlEndpoint = `/Operations/VaultGLFetchBranchCode?branchcode=${code}`;
    const { data } = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler();
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    result = {
      glnumber: '',
      bkbalance: 0
    };
  }
  return result;
}

export function useGetGldetailsByBranchCodeAndUserId(
  branchCode: string
): IGDetails & { isError: boolean; isLoading: boolean } {
  const toastActions = useContext(ToastMessageContext);
  const fallback: IGDetails = { glnumber: '', bkbalance: 0 };
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.glDetail, decryptData(branchCode) as string],
    queryFn: () =>
      getGldetailsByBranchCodeAndUserId(
        toastActions,
        decryptData(branchCode) as string
      ),
    enabled: Boolean((branchCode || '').length > 0),
    staleTime: 0
  });
  return { ...data, isError, isLoading };
}

export interface ITellerBalance {
  tillaccountno: string;
  trandate: string;
  total: number;
  dRtotal: number;
  cRtotal: number;
  dRcount: number;
  cRcount: number;
}

export async function getTellerBalanceByUserId(
  toastActions: IToastActions
): Promise<ITellerBalance> {
  let result: ITellerBalance = {
    tillaccountno: '',
    trandate: '',
    total: 0,
    dRtotal: 0,
    cRtotal: 0,
    dRcount: 0,
    cRcount: 0
  };
  const userId = getStoredUser()?.profiles.userid;
  try {
    const urlEndpoint = `/Operations/GetTellerBalance?userid=${userId}`;
    const { data } = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler();

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

export function useGetTellerBalanceByUserId() {
  const fallback = {} as ITellerBalance;
  const toastActions = useContext(ToastMessageContext);
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.tellerBalance],
    queryFn: () => getTellerBalanceByUserId(toastActions)
  });
  return { ...data, isError, isLoading };
}

export async function getTellerBalanceByUserTerllerNumber(
  toastActions: IToastActions,
  tellerNo: string
): Promise<ITellerBalance> {
  let result: ITellerBalance = {
    tillaccountno: '',
    trandate: '',
    total: 0,
    dRtotal: 0,
    cRtotal: 0,
    dRcount: 0,
    cRcount: 0
  };

  try {
    const urlEndpoint = `/Operations/GetTellerBalanceByTillAccountNo?Tillaccountno=${decryptData(tellerNo)}`;
    const { data } = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler();
    toast(message, title, severity, toastActions);
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetTellerBalanceByUserTellerNumber(tellerNo: string) {
  const fallback = {} as ITellerBalance;
  const toastActions = useContext(ToastMessageContext);
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getTellerBalanceByUserTellerNumber],
    queryFn: () =>
      getTellerBalanceByUserTerllerNumber(
        toastActions,
        decryptData(tellerNo as string) as string
      ),
    enabled: Boolean((tellerNo || '').length > 0)
  });
  return { ...data, isError, isLoading };
}
