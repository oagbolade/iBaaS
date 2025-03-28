import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  GetAllCountriesResponse,
  GetAllStatesResponse,
  GetAllTownsResponse,
  ICountries,
  IStates,
  ITown
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { decryptData } from '@/utils/decryptData';

export type FormType = 'personal' | 'business' | 'nextOfKin' | 'personal-resident';

export async function getTownByStateCode(
  toastActions: IToastActions,
  stateCode: string
): Promise<GetAllTownsResponse> {
  let result: GetAllTownsResponse = {
    responseCode: '',
    responseDescription: '',
    towns: {} as ITown[]
  };

  try {
    const urlEndpoint = `/General/City/GetTownbyState?statecode=${stateCode}`;

    const { data }: AxiosResponse<GetAllTownsResponse> = await axiosInstance({
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

export async function getStateByCountryCode(
  toastActions: IToastActions,
  countryCode: string
): Promise<GetAllStatesResponse> {
  let result: GetAllStatesResponse = {
    responseCode: '',
    responseDescription: '',
    states: {} as IStates[]
  };

  try {
    const urlEndpoint = `/General/State/GetStateByCountry?countrycode=${countryCode}`;

    const { data }: AxiosResponse<GetAllStatesResponse> = await axiosInstance({
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

async function getAllCountries(
  toastActions: IToastActions
): Promise<GetAllCountriesResponse> {
  let result: GetAllCountriesResponse = {
    responseCode: '',
    responseDescription: '',
    countries: [] as ICountries[]
  };

  try {
    const urlEndpoint = '/General/Country/GetAllCountry';

    const { data }: AxiosResponse<GetAllCountriesResponse> =
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

async function getAllStates(
  toastActions: IToastActions
): Promise<GetAllStatesResponse> {
  let result: GetAllStatesResponse = {
    responseCode: '',
    responseDescription: '',
    states: [] as IStates[]
  };

  try {
    const urlEndpoint = '/General/State/GetAllState';

    const { data }: AxiosResponse<GetAllStatesResponse> = await axiosInstance({
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

async function getAllTown(
  toastActions: IToastActions
): Promise<GetAllTownsResponse> {
  let result: GetAllTownsResponse = {
    responseCode: '',
    responseDescription: '',
    towns: [] as ITown[]
  };

  try {
    const urlEndpoint = '/Configuration/Town/GetTown';

    const { data }: AxiosResponse<GetAllTownsResponse> = await axiosInstance({
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

export function useGetAllCountries() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllCountriesResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllCountries],
    queryFn: () => getAllCountries(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetAllStates() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllStatesResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllStates],
    queryFn: () => getAllStates(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetAllTown() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllTownsResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllTown],
    queryFn: () => getAllTown(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetStateByCountryCode(countryCode: string, formType?: FormType) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllStatesResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getStateByCountryCode, decryptData(countryCode), formType],
    queryFn: () =>
      getStateByCountryCode(toastActions, decryptData(countryCode) as string),
    enabled: (countryCode.toString().trim() || '').length > 0
  });

  return { ...data, isError, isLoading };
}

export function useGetTownByStateCode(stateCode: string, formType?: FormType) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetAllTownsResponse;
  
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getTownByStateCode, decryptData(stateCode), formType],
    queryFn: () =>
      getTownByStateCode(toastActions, decryptData(stateCode) as string),
    enabled: Boolean(stateCode.length > 0)
  });

  return { ...data, isError, isLoading };
}
