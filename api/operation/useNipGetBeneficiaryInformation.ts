import { localStorage } from 'reactive-localstorage';
import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  NipGetBeneficiaryInformationPayload,
  UseGetbeneficiaryDetails
} from '../ResponseTypes/operation';
import { IToastActions } from '@/constants/types';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { nipAxiosInstance } from '@/axiosInstance';
import { decryptData } from '@/utils/decryptData';

export async function nipGetBeneficiaryInformation(
  toastActions: IToastActions,
  payload: NipGetBeneficiaryInformationPayload,
  token: string | null
): Promise<UseGetbeneficiaryDetails> {
  let result: UseGetbeneficiaryDetails = {
    nameInquiryReference: '',
    bankCode: '',
    channelCode: '',
    accountNumber: '',
    accountName: '',
    code: ''
  };

  try {
    const urlEndpoint = '/transaction/outward/name-enquiry';

    const { data }: AxiosResponse<UseGetbeneficiaryDetails> =
      await nipAxiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { ...payload },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

    result = data;
  } catch (errorResponse) {
    toast(
      'Unable to fetch beneficiary name',
      'Nip Error',
      'error',
      toastActions
    );
  }

  return result;
}

export function useNipGetBeneficiaryInformation(
  payload: NipGetBeneficiaryInformationPayload,
  token: string | null
) {
  const toastActions = useContext(ToastMessageContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: [queryKeys.getNipBeneficiaryDetails, payload],
    queryFn: () => nipGetBeneficiaryInformation(toastActions, payload, token),
    enabled: Boolean(payload.accountNumber.length === 10)
  });

  return { data, isError, isLoading };
}
