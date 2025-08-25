import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { sanitize } from 'dompurify';
import { SearchResultsGenericResponse } from '../ResponseTypes/general';
import {
  CreateCorporateCustomerResponse,
  CreateCustomerAccountResponse,
  GenericResponse,
  GetAccountDetailsResponse,
  GetAllCustomerAccountProductsResponse,
  GetAllIdTypesResponse,
  GetCustomerAccountInfoListResponse,
  GetCustomerAccountInfoResponse,
  GetCustomerByIdResponse,
  GetDocumentSubmittedResponse,
  GetMandateDetailsByAccountNumberResponse,
  GetProductDetailsByPcodeResponse,
  IAccountDetailsResults,
  IAccountInfo,
  IAccountInfoList,
  IBankProducts,
  ICustomerResult,
  ICustomers,
  IDocuments,
  IIDTypes,
  IMandateInfo,
  IProductInfos,
  SearchCustomerResponse
} from '@/api/ResponseTypes/customer-service';
import { axiosInstance, environment } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import {
  GroupMemberOnboardingFormValues,
  CreateCustomerAccountFormValues,
  CreateIndividualCustomerFormValues,
  CreateCorporateCustomerFormValues,
  CreateCustomerMandateFormValues,
  MoveCasaAccountFormValues,
  CloseCustomerAccountFormValues,
  CreateGroupFormValues,
  ReactivateCustomerAccountFormValues
} from '@/schemas/schema-values/customer-service';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { handleRedirect } from '@/utils';
import { decryptData } from '@/utils/decryptData';

export type SubmissionType = 'SUBMITTED' | 'NOT_SUBMITTED';

async function getCustomerAccountInfoList(
  toastActions: IToastActions,
  customerId: string
): Promise<GetCustomerAccountInfoListResponse> {
  let result: GetCustomerAccountInfoListResponse = {
    responseCode: '',
    responseDescription: '',
    accountInfos: {} as IAccountInfoList
  };

  try {
    const urlEndpoint = `/CustomerServices/CustomerAccountInfoList?customerid=${sanitize(customerId ?? '')}`;

    const { data }: AxiosResponse<GetCustomerAccountInfoListResponse> =
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

async function getCustomerAccountInfo(
  toastActions: IToastActions,
  customerId: string
): Promise<GetCustomerAccountInfoResponse> {
  let result: GetCustomerAccountInfoResponse = {
    responseCode: '',
    responseDescription: '',
    accountInfo: {} as IAccountInfo
  };

  try {
    const urlEndpoint = `/CustomerServices/FetchCustomerAccountInfo?customerId=${sanitize(customerId ?? '')}`;

    const { data }: AxiosResponse<GetCustomerAccountInfoResponse> =
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

async function getAllCustomerAccountProducts(
  toastActions: IToastActions
): Promise<GetAllCustomerAccountProductsResponse> {
  let result: GetAllCustomerAccountProductsResponse = {
    responseCode: '',
    responseDescription: '',
    bankproducts: [] as IBankProducts[]
  };

  try {
    const urlEndpoint = '/General/Product/GetCustomerAccountProducts?roleid';

    const { data }: AxiosResponse<GetAllCustomerAccountProductsResponse> =
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

export async function getMandateDetailsByAccountNumber(
  toastActions: IToastActions,
  accountNumber: string
): Promise<GetMandateDetailsByAccountNumberResponse> {
  let result: GetMandateDetailsByAccountNumberResponse = {
    responseCode: '',
    responseDescription: '',
    mandateInfo: [] as IMandateInfo[]
  };

  try {
    const urlEndpoint = `/CustomerServices/GetMandateDetailsByAccountNumber?accountNumber=${sanitize(accountNumber)}`;

    const { data }: AxiosResponse<GetMandateDetailsByAccountNumberResponse> =
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

export async function getCustomerById(
  toastActions: IToastActions,
  customerId: string
): Promise<GetCustomerByIdResponse> {
  let result: GetCustomerByIdResponse = {
    responseCode: '',
    responseDescription: '',
    customerResult: {} as ICustomerResult
  };

  try {
    const urlEndpoint = `/CustomerServices/GetCustomerbyID?customerid=${sanitize(customerId ?? '')}`;

    const { data }: AxiosResponse<GetCustomerByIdResponse> =
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

export async function getCustomerByIdCodes(
  toastActions: IToastActions,
  customerId: string
): Promise<GetCustomerByIdResponse> {
  let result: GetCustomerByIdResponse = {
    responseCode: '',
    responseDescription: '',
    customerResult: {} as ICustomerResult
  };

  try {
    const urlEndpoint = `/CustomerServices/GetCustomerbyIDCodes?customerid=${sanitize(customerId ?? '')}`;

    const { data }: AxiosResponse<GetCustomerByIdResponse> =
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

export async function getAccountDetails(
  toastActions: IToastActions,
  Accountno: string
): Promise<GetAccountDetailsResponse> {
  let result: GetAccountDetailsResponse = {
    responseCode: '',
    responseDescription: '',
    accDetailsResults: {} as IAccountDetailsResults
  };

  try {
    const urlEndpoint = `/AccountServices/GetAccountDetails?Accountno=${sanitize(Accountno)}`;

    const { data }: AxiosResponse<GetAccountDetailsResponse> =
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
export async function getProductDetailsByPcode(
  toastActions: IToastActions,
  customerId: string,
  prodcode: string
): Promise<GetProductDetailsByPcodeResponse> {
  let result: GetProductDetailsByPcodeResponse = {
    responseCode: '',
    responseDescription: '',
    productInfos: {} as IProductInfos
  };

  try {
    const urlEndpoint = `/CustomerServices/Customer/GetProductDetailsByPcode?prodcode=${sanitize(prodcode)}&customerId=${sanitize(customerId ?? '')}`;

    const { data }: AxiosResponse<GetProductDetailsByPcodeResponse> =
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

export async function getAllIdTypes(
  toastActions: IToastActions
): Promise<GetAllIdTypesResponse> {
  let result: GetAllIdTypesResponse = {
    responseCode: '',
    responseDescription: '',
    idCards: [] as IIDTypes[]
  };

  try {
    const urlEndpoint = '/General/Idtpe/GetAllIdType'; // TODO: Correct type on next build

    const { data }: AxiosResponse<GetAllIdTypesResponse> = await axiosInstance({
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

export async function getDocuments(
  toastActions: IToastActions,
  type: SubmissionType,
  customerId: string,
  prodcode: string
): Promise<GetDocumentSubmittedResponse> {
  let result: GetDocumentSubmittedResponse = {
    responseCode: '',
    responseDescription: '',
    documents: [] as IDocuments[]
  };

  try {
    const urlEndpoint = `/CustomerServices/Customer/${
      type === 'SUBMITTED' ? 'GetDocumentSubmitted' : 'GetDocumentNotSubmitted'
    }?customerId=${Number(customerId)}&prodcode=${prodcode}`;

    const { data }: AxiosResponse<GetDocumentSubmittedResponse> =
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

export async function searchCustomer(
  toastActions: IToastActions,
  customerName: string
): Promise<SearchCustomerResponse> {
  let result: SearchCustomerResponse = {
    responseCode: '',
    responseDescription: '',
    customers: [] as ICustomers[],
    accountDetailsResults: [] as ICustomers[]
  };

  try {
    const urlEndpoint = `/CustomerServices/SearchCustomer?criterion=${customerName}&searchParam=1`;

    const { data }: AxiosResponse<SearchCustomerResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      }
    );

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export async function filterCustomerAccountSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/customer-service/search/accounts?page=${sanitize(String(params?.page ?? 1))}&size=10`;
    const { data }: AxiosResponse<SearchCustomerResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'POST',
        data: {
          branchCode: params?.branchID,
          status: params?.status,
          accountNumber: params?.accountNumber,
          accountName: params?.accountName,
          productCode: params?.productCode
        },
        headers: {
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      }
    );

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

export async function filterCustomerSearch(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;

  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/customer-service/search/customers?page=${sanitize(String(params?.page ?? 1))}&size=10`;
    const { data }: AxiosResponse<SearchCustomerResponse> = await axiosInstance(
      {
        url: urlEndpoint,
        method: 'POST',
        data: {
          branchCode: params?.branchID,
          fullName: params?.fullName,
          customerId: params?.customerID,
          email: params?.email,
          phoneNo: params?.phoneNo
        },
        headers: {
          'Content-Type': 'application/json',
          token: `${getStoredUser()?.token}`
        }
      }
    );

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

export function useGetAllCustomerAccountProducts(): GetAllCustomerAccountProductsResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllCustomerAccountProductsResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllCustomerAccountProducts],
    queryFn: () => getAllCustomerAccountProducts(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetCustomerAccountInfoList(
  customerId: string
): GetCustomerAccountInfoListResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetCustomerAccountInfoListResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCustomerAccountInfoList],
    queryFn: () => getCustomerAccountInfoList(toastActions, customerId),
    enabled: Boolean(customerId?.toString().length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetCustomerAccountInfo(
  customerId: string
): GetCustomerAccountInfoResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetCustomerAccountInfoResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCustomerAccountInfo],
    queryFn: () => getCustomerAccountInfo(toastActions, customerId),
    enabled: Boolean(customerId)
  });

  return { ...data, isError, isLoading };
}

export function useSearchCustomer(customerName: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchCustomerResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.searchCustomer, customerName],
    queryFn: () =>
      searchCustomer(toastActions, decryptData(customerName) as string),
    enabled: Boolean(customerName.length > 0)
  });

  return { ...data, isError, isLoading };
}

async function createCorporateCustomer(
  toastActions: IToastActions,
  body: CreateCorporateCustomerFormValues,
  isUpdating: boolean,
  customerId: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/CustomerServices/${
      isUpdating
        ? `EditCorporatecustomer?customerId=${sanitize(customerId ?? '')}`
        : 'CreateCorporateCustomer'
    }`;
    const { data }: AxiosResponse<CreateCorporateCustomerResponse> =
      await axiosInstance({
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
    if (data.responseCode !== '00') {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

async function createIndividualCustomer(
  toastActions: IToastActions,
  body: CreateIndividualCustomerFormValues,
  isUpdating: boolean,
  customerId: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/CustomerServices/${
      isUpdating
        ? `UpdateIndividualCustomer?customerId=${sanitize(customerId ?? '')}`
        : 'CreateIndividualCustomer'
    }`;
    const { data }: AxiosResponse<CreateCustomerAccountResponse> =
      await axiosInstance({
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

    if (!SUCCESS_CODES.includes(data.responseCode)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

async function createCustomerAccount(
  toastActions: IToastActions,
  body: CreateCustomerAccountFormValues,
  isUpdating: boolean,
  accountnumber: string | null
): Promise<void> {
  try {
    const urlEndpoint = `/AccountServices/${
      isUpdating
        ? `EditAccount?accountnumber=${accountnumber}`
        : 'CreateAccount'
    }`;
    const { data }: AxiosResponse<CreateCustomerAccountResponse> =
      await axiosInstance({
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

    if (!SUCCESS_CODES.includes(data.responseCode)) {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

async function createGroup(
  toastActions: IToastActions,
  body: CreateGroupFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/CreateGroup';
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
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

async function createCustomerMandate(
  toastActions: IToastActions,
  body: CreateCustomerMandateFormValues
): Promise<void> {
  const formData = new FormData();
  formData.append('AccountNumber', body.AccountNumber);
  formData.append('CustomerId', body.CustomerId);
  formData.append('BVN', body.BVN);

  formData.append('PictImgType', body.PictImgType);
  formData.append('SignImageType', body.SignImageType);
  formData.append('customerPict', body.customerPict);
  formData.append('customerSign', body.customerSign);

  try {
    const urlEndpoint = '/CustomerServices/CreateCustomerMandate';
    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data',
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

async function groupMemberOnboarding(
  toastActions: IToastActions,
  body: GroupMemberOnboardingFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/GroupMemberOnboarding';
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
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

async function moveCASA(
  toastActions: IToastActions,
  body: MoveCasaAccountFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/MoveCasaAccount';
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
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}

async function closeCustomerAccount(
  toastActions: IToastActions,
  body: CloseCustomerAccountFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/AccountServices/InsertClosure';
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
    if (data.responseCode !== '00') {
      throw new Error(message);
    }
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
    throw errorResponse;
  }
}

async function reactivateCustomerAccount(
  toastActions: IToastActions,
  body: ReactivateCustomerAccountFormValues
): Promise<void> {
  try {
    const urlEndpoint = '/CustomerServices/ReactivateAccount';
    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'PUT',
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

async function deleteCustomerMandate(
  toastActions: IToastActions,
  customerid: string
): Promise<void> {
  try {
    const urlEndpoint = `/CustomerServices/DeleteCustomerMandate?customerid=${customerid}`;
    const { data }: AxiosResponse<GenericResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'DELETE',
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

export function useCreateCustomerAccount(
  isUpdating: boolean = false,
  accountnumber: string | null = null,
  urlState: string | null = null
) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCustomerAccountFormValues) =>
      createCustomerAccount(
        toastActions,
        body,
        isUpdating,
        decryptData(accountnumber as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterCustomerSearch],
        [queryKeys.getAccountDetails]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      if (urlState === 'financeMgt') {
        handleRedirect(router, '/finance/account/');
      } else {
        handleRedirect(router, '/customer-service/customer/');
      }
    }
  });

  return { mutate, isPending, isError, error };
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateGroupFormValues) =>
      createGroup(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterGroupSearch],
        [queryKeys.getGroupById]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      setTimeout(() => {
        handleRedirect(router, '/customer-service/group/');
      }, 2500);
    }
  });

  return { mutate, isPending, isError, error };
}

export function useCreateIndividualCustomer(
  isUpdating: boolean = false,
  customerId: string | null = null
) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateIndividualCustomerFormValues) =>
      createIndividualCustomer(
        toastActions,
        body,
        isUpdating,
        decryptData(customerId as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.searchCustomer],
        [queryKeys.filterCustomerSearch],
        [queryKeys.getCustomerById],
        [queryKeys.getCustomerByIdCodes]
      ];

      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      setTimeout(() => {
        handleRedirect(router, '/customer-service/customer/');
      }, 2500);
    }
  });

  return { mutate, isPending, isError, error };
}

export function useCreateCorporateCustomer(
  isUpdating: boolean = false,
  customerId: string | null = null
) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCorporateCustomerFormValues) =>
      createCorporateCustomer(
        toastActions,
        body,
        isUpdating,
        decryptData(customerId as string)
      ),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.searchCustomer],
        [queryKeys.filterCustomerSearch],
        [queryKeys.getCustomerById],
        [queryKeys.getCustomerByIdCodes]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      setTimeout(() => {
        handleRedirect(router, '/customer-service/customer/');
      }, 2500);
    }
  });

  return { mutate, isPending, isError, error };
}

export function useGroupMemberOnboarding() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: GroupMemberOnboardingFormValues) =>
      groupMemberOnboarding(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterGroupSearch],
        [queryKeys.getGroupMembersbyGroupId]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );

      setTimeout(() => {
        handleRedirect(router, '/customer-service/group/');
      }, 2500);
    }
  });

  return { mutate, isPending, isError, error };
}

type RedirectProps = {
  AccountNumber: string;
  CustomerId: string;
};

export function useCreateCustomerMandate({
  AccountNumber,
  CustomerId
}: RedirectProps) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateCustomerMandateFormValues) =>
      createCustomerMandate(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getMandateDetailsByAccountNumber] // Change keys to use from search endpoints
      });

      setTimeout(() => {
        handleRedirect(
          router,
          `/customer-service/customer/mandate/view-mandate/?accountNumber=${AccountNumber}&customerId=${CustomerId}`
        );
      }, 2000);
    }
  });

  return { mutate, isPending, isError, error };
}

export function useDeleteCustomerMandate() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (customerid: string) =>
      deleteCustomerMandate(toastActions, customerid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getMandateDetailsByAccountNumber]
      });
    }
  });

  return { mutate, isPending, isError, error };
}

export function useMoveCASA() {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: MoveCasaAccountFormValues) =>
      moveCASA(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getCustomerById]
      });

      handleRedirect(router, '/customer-service/customer/');
    }
  });

  return { mutate, isPending, isError, error };
}

export function useCloseCustomerAccount(urlState: string) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CloseCustomerAccountFormValues) =>
      closeCustomerAccount(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getCustomerById]
      });

      if (urlState === 'financeMgt') {
        handleRedirect(router, '/finance/account/');
      } else {
        handleRedirect(router, '/customer-service/customer/');
      }
    }
  });

  return { mutate, isPending, isError, error };
}

export function useReactivateCustomerAccount(urlState: string) {
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: ReactivateCustomerAccountFormValues) =>
      reactivateCustomerAccount(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getCustomerById]
      });

      if (urlState === 'financeMgt') {
        handleRedirect(router, '/finance/account/');
      } else {
        handleRedirect(router, '/customer-service/customer/');
      }
    }
  });

  return { mutate, isPending, isError, error };
}

export function useGetDocuments(
  type: SubmissionType,
  customerId: string,
  prodcode: string
) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetDocumentSubmittedResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDocuments, customerId, prodcode, type],
    queryFn: () => getDocuments(toastActions, type, customerId, prodcode),
    enabled: Boolean(
      customerId.toString().length > 0 && prodcode.toString().length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetAllIdTypes() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAllIdTypesResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllIdTypes],
    queryFn: () => getAllIdTypes(toastActions)
  });

  return { ...data, isError, isLoading };
}

export function useGetProductDetailsByPcode(
  customerId: string,
  prodcode: string
) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetProductDetailsByPcodeResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getDocuments, customerId, prodcode],
    queryFn: () => getProductDetailsByPcode(toastActions, customerId, prodcode),
    enabled: Boolean(
      customerId?.toString().length > 0 && prodcode?.toString().length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export function useGetAccountDetails(
  Accountno: string,
  p0?: { enabled: boolean }
) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = [] as GetAccountDetailsResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAccountDetails, decryptData(Accountno)],
    queryFn: () =>
      getAccountDetails(toastActions, decryptData(Accountno) as string),
    enabled: Boolean(Accountno?.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetCustomerById(customerId: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetCustomerByIdResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCustomerById, decryptData(customerId)],
    queryFn: () =>
      getCustomerById(toastActions, decryptData(customerId) as string),
    enabled: Boolean(customerId?.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetCustomerByIdCodes(customerId: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetCustomerByIdResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getCustomerByIdCodes, decryptData(customerId)],
    queryFn: () =>
      getCustomerByIdCodes(toastActions, decryptData(customerId) as string),
    enabled: Boolean(customerId?.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useGetMandateDetailsByAccountNumber(
  accountNumber: string,
  mendateInfor?: { enabled: string | true }
) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetMandateDetailsByAccountNumberResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getMandateDetailsByAccountNumber,
      decryptData(accountNumber)
    ],
    queryFn: () =>
      getMandateDetailsByAccountNumber(
        toastActions,
        decryptData(accountNumber) as string
      ),
    enabled: Boolean(accountNumber?.length > 0)
  });

  return { ...data, isError, isLoading };
}

export function useFilterCustomerSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: [
      queryKeys.filterCustomerSearch,
      params?.branchID || '',
      params?.fullName || '',
      params?.page || 1
    ],
    queryFn: () => filterCustomerSearch(toastActions, params),
    enabled: Boolean(
      (params?.branchID || '').length > 0 || (params?.fullName || '').length > 0
    )
  });

  return { ...data, isError, isLoading, isFetching };
}

export function useFilterCustomerAccountSearch(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.filterCustomerAccountSearch,
      params?.branchID || '',
      params?.accountNumber || '',
      params?.status || '',
      params?.page || 1,
      params?.productCode || ''
    ],
    queryFn: () => filterCustomerAccountSearch(toastActions, params),
    enabled: Boolean(
      (params?.branchID || '').length > 0 ||
        (params?.status?.toString() || '').length > 0 ||
        (params?.accountNumber || '').length > 0 ||
        (params?.productCode || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}
