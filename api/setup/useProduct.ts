import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  IBankProducts,
  ICreditInterests,
  IDemandDeposit,
  IException,
  IFrequency,
  IInterests,
  ILoanAccount,
  ILoanClass,
  IProdDocs,
  IProductInfo,
  IProducts,
  IProductClass,
  SearchLoanProductResponse,
  UseGetAllLoanAccountResponse,
  UseGetAllProductDocsResponse,
  UseGetProductTypeResponse,
  IProdType,
  UseGetProductClassByCategoryResponse,
  IProdCodeType,
  UseGetGLWithBranchCodeResponse,
  IGLWithBranchCode,
  ITreasuryDeposit
} from '../ResponseTypes/setup';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  CreateDemandDepositFormValues,
  CreateLoanAccountFormValues,
  CreateTreasuryFormValues
} from '@/schemas/schema-values/setup';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

async function createLoanAccountProduct(
  toastActions: IToastActions,
  body: CreateLoanAccountFormValues,
  isUpdating: boolean,
  productcode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/General/Product/${
      isUpdating
        ? `UpdateLoanAccountProduct?productcode=${productcode}`
        : 'CreateLoanAccountProduct'
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
    if (!SUCCESS_CODES.includes(data?.responseCode as string)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}
async function createTreasuryAccountProduct(
  toastActions: IToastActions,
  body: CreateTreasuryFormValues,
  isUpdating: boolean,
  productcode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/General/Product/${
      isUpdating
        ? `UpdateTermDepositProduct?productcode=${productcode}`
        : 'CreateTermDepositProduct'
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
    if (!SUCCESS_CODES.includes(data?.responseCode as string)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}
async function createDemandDepositProduct(
  toastActions: IToastActions,
  body: CreateDemandDepositFormValues,
  isUpdating: boolean,
  productcode: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/General/Product/${
      isUpdating
        ? `UpdateDemandDepositProduct?productcode=${productcode}`
        : 'CreateDemandDepositProduct'
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
  }
}

async function getProductType(
  toastActions: IToastActions,
  id: string | null
): Promise<UseGetProductTypeResponse> {
  let result: UseGetProductTypeResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IProdCodeType[]
  };

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/GetProductType?id=${id}`;

    const { data }: AxiosResponse<UseGetProductTypeResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Tenant-ID': getStoredUser()?.companyCode || '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    // const { message, title, severity } = globalErrorHandler(data);  // This is commented out because it shows a toast on every product class change cause no responseMessage is passed from the API
    // toast(message, title, severity, toastActions);  // This is commented out because it shows a toast on every product class change cause no responseMessage is passed from the API

    result = data;
  } catch (errorResponse) {
    // const { message, title, severity } = globalErrorHandler({}, errorResponse);  // This is commented out because it shows a toast on every product class change cause no responseMessage is passed from the API
    // toast(message, title, severity, toastActions); // This is commented out because it shows a toast on every product class change cause no responseMessage is passed from the API
  }

  return result;
}
async function getProductClassByCategory(
  toastActions: IToastActions,
  id: string | null
): Promise<UseGetProductClassByCategoryResponse> {
  let result: UseGetProductClassByCategoryResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IProdType[]
  };

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/GetProductClassByCategory?id=${id}`;

    const { data }: AxiosResponse<UseGetProductClassByCategoryResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Tenant-ID': getStoredUser()?.companyCode || '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    // toast(message, title, severity, toastActions); // This cause error notification

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    // toast(message, title, severity, toastActions);  // This cause error notification
  }

  return result;
}

async function getGLWithBranchCode(
  toastActions: IToastActions
): Promise<UseGetGLWithBranchCodeResponse> {
  let result: UseGetGLWithBranchCodeResponse = {
    responseCode: '',
    responseDescription: '',
    data: [] as IGLWithBranchCode[]
  };

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/GetAllGLWithBranchCode`;

    const { data }: AxiosResponse<UseGetGLWithBranchCodeResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Tenant-ID': getStoredUser()?.companyCode || '',
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

export async function filterAllProductSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/setup/search/products?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchLoanProductResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          productClass: params?.productClass?.toString(),
          productName: params?.productName,
          productCode: params?.productCode
        },
        headers: {
          'Tenant-ID': getStoredUser()?.companyCode || '',
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

async function getAllProductByCode(
  toastActions: IToastActions,
  prodcode: string | null
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    productInfos: {} as IProductInfo
  };

  try {
    const urlEndpoint = `/General/Product/GetProductDetailsByPcode?prodcode=${prodcode}`;

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getAllProductDocs(
  toastActions: IToastActions
): Promise<UseGetAllProductDocsResponse> {
  let result: UseGetAllProductDocsResponse = {
    responseCode: '',
    responseDescription: '',
    prodDocs: [] as IProdDocs[]
  };

  try {
    const urlEndpoint = '/General/Department/GetAllProductDocs';

    const { data }: AxiosResponse<UseGetAllProductDocsResponse> =
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

async function getInterestRate(
  toastActions: IToastActions
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    interests: [] as IInterests[]
  };

  try {
    const urlEndpoint = '/General/Product/GetInterestRate';

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getMinMaxCreditInterest(
  toastActions: IToastActions
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    creditInterests: [] as ICreditInterests[]
  };

  try {
    const urlEndpoint = '/General/Product/MinMaxCreditInterest';

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getProductClass(
  toastActions: IToastActions
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    products: [] as IProducts[]
  };

  try {
    const urlEndpoint = '/General/Product/GetAllProductClass';

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getLoanClass(
  toastActions: IToastActions
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    loanClass: [] as ILoanClass[]
  };

  try {
    const urlEndpoint = '/General/Product/LoanClass';

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getAllException(
  toastActions: IToastActions
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    exception: [] as IException[]
  };

  try {
    const urlEndpoint = '/Configuration/Exception/GetAllException';

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getAllProduct(
  toastActions: IToastActions
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    bankproducts: [] as IBankProducts[]
  };

  try {
    const urlEndpoint = '/General/Product/GetAllProduct';

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getLoanTerm(
  toastActions: IToastActions
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    frequency: [] as IFrequency[]
  };

  try {
    const urlEndpoint = '/General/Product/PaymentFrequency';

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getLoanProductByCode(
  toastActions: IToastActions,
  productcode: string | null
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    loanProducts: {} as ILoanAccount
  };

  try {
    const urlEndpoint = `/General/Product/GetLoanProductByPcode?productcode=${productcode}`;

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getTreasuryProductByCode(
  toastActions: IToastActions,
  productcode: string | null
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    termDeposit: {} as ITreasuryDeposit
  };

  try {
    const urlEndpoint = `/General/Product/GetTermDepByPcode?productcode=${productcode}`;

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getLoanProductCode(
  toastActions: IToastActions,
  productclass: string | null
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    products: [] as IProductClass[]
  };

  try {
    const urlEndpoint = `/General/Product/GetProductByClass?productclass=${productclass}`;

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

async function getDemandDepositByProductCode(
  toastActions: IToastActions,
  productcode: string | null
): Promise<UseGetAllLoanAccountResponse> {
  let result: UseGetAllLoanAccountResponse = {
    responseCode: '',
    responseDescription: '',
    demandDeposit: {} as IDemandDeposit
  };

  try {
    const urlEndpoint = `/General/Product/GetDemandDepByPcode?productcode=${productcode}`;

    const { data }: AxiosResponse<UseGetAllLoanAccountResponse> =
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

export function useFilterLoanProductSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterLoanAccountSearch,
      params?.productClass?.toString() || '',
      params?.productName || '',
      params?.productCode || '',
      params?.page || 1
    ],
    queryFn: () => filterAllProductSearch(toastActions, params),
    enabled: Boolean(
      (params?.productClass?.toString() || '').length > 0 ||
        (params?.productName || '').length > 0 ||
        (params?.productCode || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetAllProductByCode(
  prodcode: string | null
): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllProductByCode, prodcode],
    queryFn: () =>
      getAllProductByCode(toastActions, decryptData(prodcode as string)),
    enabled: Boolean((prodcode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
export function useGetProductTypeByid(
  id: string | null
): UseGetProductTypeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetProductTypeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getProductTypeId, id],
    queryFn: () => getProductType(toastActions, id),
    enabled: Boolean((id || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
export function useGetProductClassByCastegory(
  id: string | null
): UseGetProductClassByCategoryResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetProductClassByCategoryResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getProductClassByCategory, id],
    queryFn: () => getProductClassByCategory(toastActions, id),
    enabled: Boolean((id || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
export function useGetAllProductDocs(): UseGetAllProductDocsResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllProductDocs],
    queryFn: () => getAllProductDocs(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetTreasuryProductByCode(
  productcode: string | null
): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getTreasuryProductByCode, productcode],
    queryFn: () => getTreasuryProductByCode(toastActions, productcode),
    enabled: Boolean((productcode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetLoanProductByCode(
  productcode: string | null
): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getLoanProductByCode, productcode],
    queryFn: () => getLoanProductByCode(toastActions, productcode),
    enabled: Boolean((productcode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
export function useGetAllGLWithBranchCode(): UseGetGLWithBranchCodeResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as UseGetGLWithBranchCodeResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getGLWithBranchCode],
    queryFn: () => getGLWithBranchCode(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetLoanProductCode(
  productclass: string | null
): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getLoanProductCode, productclass],
    queryFn: () => getLoanProductCode(toastActions, productclass),
    enabled: Boolean((productclass || '').length > 0)
  });

  return { ...data, isError, isLoading };
}
export function useGetInterestsRate(): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getInterestRate],
    queryFn: () => getInterestRate(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetProductClass(): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getProductClass],
    queryFn: () => getProductClass(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetLoanClass(): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getLoanClass],
    queryFn: () => getLoanClass(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetAllProduct(): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllProduct],
    queryFn: () => getAllProduct(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetAllException(): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllException],
    queryFn: () => getAllException(toastActions)
  });

  return { ...data, isError, isLoading };
}
export function useGetAllLoanTerm(): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getLoanTerm],
    queryFn: () => getLoanTerm(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetMaxCreditInterest(): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;

  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getMinMaxCreditInterest],
    queryFn: () => getMinMaxCreditInterest(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetDemandDepositByCode(
  productcode: string | null
): UseGetAllLoanAccountResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as UseGetAllLoanAccountResponse;
  // get data from server via useQuery
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDemandDepositByCode, productcode],
    queryFn: () => getDemandDepositByProductCode(toastActions, productcode),
    enabled: Boolean((productcode || '').length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useCreateLoanAccountProduct(
  isUpdating: boolean = false,
  productcode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateLoanAccountFormValues) =>
      createLoanAccountProduct(toastActions, body, isUpdating, productcode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getLoanProductByCode],
        [queryKeys.filterLoanAccountSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/product-gl/product-setup/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export function useCreateTreasuryAccountProduct(
  isUpdating: boolean = false,
  productcode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateTreasuryFormValues) =>
      createTreasuryAccountProduct(toastActions, body, isUpdating, productcode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getTreasuryProductByCode],
        [queryKeys.filterLoanAccountSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/product-gl/product-setup/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

export function useCreateDemandDepositProduct(
  isUpdating: boolean = false,
  productcode: string | null = null
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateDemandDepositFormValues) =>
      createDemandDepositProduct(toastActions, body, isUpdating, productcode),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.getDemandDepositByCode],
        [queryKeys.filterLoanAccountSearch]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      handleRedirect(router, '/setup/product-gl/product-setup/');
    }
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}

// Return the user object and auth methods

interface IProductCode {
  productCode: string;
  responseCode: string;
  responseDescription: string;
}

// Generate Product code using product class
export async function generateProductCode(
  // toastActions: IToastActions,
  productClass: string
): Promise<IProductCode> {
  let result: IProductCode = {} as IProductCode;
  try {
    const urlEndpoint = `/General/Product/GenerateProductCode?productclass=${decryptData(productClass)}`;

    const { data }: AxiosResponse<IProductCode> = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });
    // const { message, title, severity } = globalErrorHandler(data);  // This is commented out because it shows a toast on every product class change cause no responseMessage is passed from the API
    result = data;
  } catch (errorResponse) {
    // const { message, title, severity } = globalErrorHandler({}, errorResponse);  // This is commented out because it shows a toast on every product class change cause no responseMessage is passed from the API
  }
  return result;
}

export function useGenerateProductCode(productClass: string) {
  // const toastActions = useContext(ToastMessageContext);
  const fallback = { productCode: '' } as IProductCode;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.generateProductCode],
    queryFn: () => generateProductCode(decryptData(productClass) as string),
    enabled: true
  });

  return { data, isError, isLoading };
}
