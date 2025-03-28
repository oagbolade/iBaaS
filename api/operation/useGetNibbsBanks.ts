import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  INibbsBankData,
  NipGetBanksPayload,
  UseGetNibbsBanks
} from '../ResponseTypes/operation';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { IToastActions } from '@/constants/types';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { nipAxiosInstance } from '@/axiosInstance';
import { decryptData } from '@/utils/decryptData';

export async function getNibbsBanks(
  toastActions: IToastActions,
  payload: NipGetBanksPayload,
  token: string | null
): Promise<UseGetNibbsBanks> {
  let result: UseGetNibbsBanks = {
    code: '',
    time: '',
    data: [] as INibbsBankData[]
  };
  try {
    const urlEndpoint = '/transaction/outward/banks';

    const { data } = await nipAxiosInstance({
      url: urlEndpoint,
      method: 'GET',
      data: { ...payload },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    result = data;
  } catch (errorResponse) {
    toast('Unable to fetch banks', 'Nip Error', 'error', toastActions);
  }

  return result;
}

export function useGetNibbsBanks(
  payload: NipGetBanksPayload,
  token: string | null
) {
  const toastActions = useContext(ToastMessageContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: [queryKeys.getAllNibbsBank, payload],
    queryFn: () => getNibbsBanks(toastActions, payload, token),
    enabled: Boolean((token || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
