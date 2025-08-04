import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';

import {
  GetGlClassByNodeCodeResponse,
  GetGlDetailsResponse,
  GetGlNodesByTypeCodeResponse,
  IGLAccount,
  IGLAccountDetail,
  IGlClass,
  IGlDetails,
  IGlNode,
  INodeType,
  SearchGLAccountResponse,
  UseGetAllGlClassType,
  UseGetAllNodeType,
  UseGetGLAccountResponse,
  UseGetGLByGlNumber,
  UseGetGLType
} from '@/api/ResponseTypes/admin';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { CreateGlAccountFormValues } from '@/schemas/schema-values/admin';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { ISearchParams } from '@/app/api/search/route';
import { toast } from '@/utils/toast';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

export async function filterGLAccountSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/admin/search/generalLedger?page=${params?.page}&size=10`;

    const { data }: AxiosResponse<SearchGLAccountResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          branchCode: params?.branchID,
          acctName: params?.accountName,
          glnumber: params?.glAccountNumber
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

    if (environment === 'development') {
      toast(message, title, severity, toastActions);
    }

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

async function getGLAccount(
  toastActions: IToastActions
): Promise<UseGetGLAccountResponse> {
  let result: UseGetGLAccountResponse = {
    responseCode: '',
    responseDescription: '',
    bankgl: []
  };

  try {
    const urlEndpoint = '/Admin/GLAccount/GetAllGLAccount';

    const { data }: AxiosResponse<UseGetGLAccountResponse> =
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
async function getGLAllAccount(
  toastActions: IToastActions
): Promise<UseGetGLAccountResponse> {
  let result: UseGetGLAccountResponse = {
    responseCode: '',
    responseDescription: '',
    bankgl: {} as IGLAccountDetail
  };

  try {
    const urlEndpoint = '/Admin/GLAccount/GetAllGLAccount';

    const { data }: AxiosResponse<UseGetGLAccountResponse> =
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

async function getAllNodeType(
  toastActions: IToastActions
): Promise<UseGetAllNodeType> {
  let result: UseGetAllNodeType = {
    responseCode: '',
    responseDescription: '',
    node: [] as INodeType[]
  };

  try {
    const urlEndpoint = '/Configuration/GLNode/GetAllNodes';

    const { data }: AxiosResponse<UseGetAllNodeType> = await axiosInstance({
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

async function getAllGlTypeClass(
  toastActions: IToastActions
): Promise<UseGetAllGlClassType> {
  let result: UseGetAllGlClassType = {
    responseCode: '',
    responseDescription: '',
    glClasses: []
  };

  try {
    const urlEndpoint = '/Configuration/GLCLass/GetAllGLClasses';

    const { data }: AxiosResponse<UseGetAllGlClassType> = await axiosInstance({
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

async function getGLType(toastActions: IToastActions): Promise<UseGetGLType> {
  let result: UseGetGLType = {
    responseCode: '',
    responseDescription: '',
    glType: []
  };

  try {
    const urlEndpoint = '/Configuration/GL/GLType';
    const { data }: AxiosResponse<UseGetGLType> = await axiosInstance({
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

async function getGlNodeByTypeCode(
  toastActions: IToastActions,
  typeCode: string | null
): Promise<GetGlNodesByTypeCodeResponse> {
  let result: GetGlNodesByTypeCodeResponse = {
    responseCode: '',
    responseDescription: '',
    gLnode: [] as IGlNode[]
  };

  try {
    const urlEndpoint = `/Configuration/Product/GetGLNode?gltypecode=${typeCode}`;

    const { data }: AxiosResponse<GetGlNodesByTypeCodeResponse> =
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

async function getGlClassByNodeCode(
  toastActions: IToastActions,
  nodeCode: string | null
): Promise<GetGlClassByNodeCodeResponse> {
  let result: GetGlClassByNodeCodeResponse = {
    responseCode: '',
    responseDescription: '',
    gLclass: [] as IGlClass[]
  };

  try {
    const urlEndpoint = `/Configuration/Product/GetGLClass?nodecode=${nodeCode}`;

    const { data }: AxiosResponse<GetGlClassByNodeCodeResponse> =
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

async function getGlDetails(
  toastActions: IToastActions,
  glClassCode: string | null,
  currencyCode: string | null
): Promise<GetGlDetailsResponse> {
  let result: GetGlDetailsResponse = {
    responseCode: '',
    responseDescription: '',
    glDetails: [] as IGlDetails[]
  };

  try {
    const urlEndpoint = `/Configuration/Product/GetGLDetails?glclass=${glClassCode}&currency=${currencyCode}`;

    const { data }: AxiosResponse<GetGlDetailsResponse> = await axiosInstance({
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

async function getGLByGLNumber(
  toastActions: IToastActions,
  glNumber: string | null
): Promise<UseGetGLByGlNumber> {
  let result: UseGetGLByGlNumber = {
    responseCode: '',
    responseDescription: '',
    bankgl: {} as IGLAccount
  };

  try {
    const urlEndpoint = `/Admin/GLAccount/GetGLAccount?glNumber=${glNumber}`;

    const { data }: AxiosResponse<UseGetGLByGlNumber> = await axiosInstance({
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

export function useGetGLByGLNumber(
  glNumber: string | null,
  p0?: { enabled: boolean }
): UseGetGLByGlNumber {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetGLByGlNumber;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getGLAccountByGlNumber,
      decryptData(glNumber as string)
    ],
    queryFn: () =>
      getGLByGLNumber(toastActions, decryptData(glNumber as string)),
    enabled: Boolean((glNumber || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetGLClasType(): UseGetAllGlClassType {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllGlClassType;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.glClasses],
    queryFn: () => getAllGlTypeClass(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetNode(): UseGetAllNodeType {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllNodeType;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.node],
    queryFn: () => getAllNodeType(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetGlNodeByTypeCode(
  typeCode: string
): GetGlNodesByTypeCodeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetGlNodesByTypeCodeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGlNodeByTypeCode, typeCode],
    queryFn: () => getGlNodeByTypeCode(toastActions, typeCode),
    enabled: Boolean((typeCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetGlClassByNodeCode(
  nodeCode: string
): GetGlClassByNodeCodeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetGlClassByNodeCodeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGlClassByNodeCode, nodeCode],
    queryFn: () => getGlClassByNodeCode(toastActions, nodeCode),
    enabled: Boolean((nodeCode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetGlDetails(
  glClassCode: string,
  currencyCode: string
): GetGlDetailsResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetGlDetailsResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGlClassByNodeCode, glClassCode, currencyCode],
    queryFn: () => getGlDetails(toastActions, glClassCode, currencyCode),
    enabled: Boolean(
      (glClassCode || '').length > 0 && (currencyCode || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetGLType(): UseGetGLType {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetGLType;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.glType],
    queryFn: () => getGLType(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetGLAccount(): UseGetGLAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetGLAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.glAccount],
    queryFn: () => getGLAccount(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetGLAllAccount(): UseGetGLAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetGLAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGLAllAccount],
    queryFn: () => getGLAllAccount(toastActions)
  });

  return { ...data, isError, isLoading };
}
export async function searchGlAccount(
  toastActions: IToastActions,
  params: ISearchParams
): Promise<UseGetGLAccountResponse> {
  let result: UseGetGLAccountResponse = {
    responseCode: '',
    responseDescription: '',
    bankgls: []
  };

  try {
    const urlEndpoint = `http://localhost:3000${process.env.DOMAIN}/api/search?search=${params.search}&action=gl-account`;

    const { data }: AxiosResponse<UseGetGLAccountResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
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
async function CreateGLAccount(
  toastActions: IToastActions,
  body: CreateGlAccountFormValues,
  isUpdating: boolean,
  GLNumber: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/Admin/GLAccount/${
      isUpdating ? `UpdateGLAccount?GLNumber=${GLNumber}` : 'CreateGLAccount'
    }`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: isUpdating ? 'PUT' : 'POST',
      data: { ...body },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);
    if (!SUCCESS_CODES.includes(data.responseCode || '')) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

export function useCreateGLAccount(
  isUpdating: boolean = false,
  GLNumber: string | null = null
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateGlAccountFormValues) =>
      CreateGLAccount(
        toastActions,
        body,
        isUpdating,
        decryptData(GLNumber as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterCustomerSearch],
        [queryKeys.filterGLAccountSearch],
        [queryKeys.getAccountDetails],
        [queryKeys.filterCustomerAccountSearch],
        [queryKeys.getGLAccountByGlNumber],
        [queryKeys.glAccount]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      if (pathname === '/finance/general-ledger/create') {
        handleRedirect(router, '/finance/general-ledger');
      } else {
        handleRedirect(router, '/admin/gl-account');
      }
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export function useFilterGLAccountSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterGLAccountSearch,
      params?.branchID || '',
      params?.glAccountNumber || '',
      params?.accountName || '',
      params?.page || 1
    ],
    queryFn: () => filterGLAccountSearch(toastActions, params || {}),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.glAccountNumber || '').length > 0 ||
        (params?.accountName || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
