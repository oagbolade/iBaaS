import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler, SUCCESS_CODES } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ISearchParams } from '@/app/api/search/route';
import { SEARCH_BASE_URL } from '@/axiosInstance/constants';
import { SearchResultsGenericResponse } from '@/api/ResponseTypes/general';
import {
  setOverdraftInitialValues,
  SetOverdraftInitialValues,
  ISetTerminateLoanValues,
  CancelLoanValues,
  RestructureLoanValues,
  SetPartialPayOffValues,
  ILoanSources,
  LoanUnderwriteInitialValues,
  disburseLoanvalues
} from '@/schemas/schema-values/loan';
import { handleRedirect } from '@/utils';
import {
  GetLoanAccountDetailsResponse,
  ILoanAccountDetails,
  productLoanRepayment,
  ProductLoanDetails,
  ILoanCollaterals,
  ProductLoanPurpose,
  createLoanUnderWritingResponse,
  AllLoanProductsResponse,
  GetCustomerLoanAcct,
  GetLoanByAccountDetailsResponse,
  LoanAccountDetailPreview,
  GetOverdraftDetailResponse,
  GetLoanDisbursementResponse
} from '@/api/ResponseTypes/loans';
import { decryptData } from '@/utils/decryptData';

async function getLoanAccountDetails(
  toastActions: IToastActions,
  accountnumber: string,
  action: string
): Promise<GetLoanAccountDetailsResponse> {
  let result: GetLoanAccountDetailsResponse = {
    responseCode: '',
    responseDescription: '',
    settlementAccount: '',
    loanAccDetails: {} as ILoanAccountDetails
  };

  try {
    const urlEndpoint = `/CreditManagement/GetLoanAccDetails?accountnumber=${accountnumber}&action=${action}`;

    const { data }: AxiosResponse<GetLoanAccountDetailsResponse> =
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

export function useGetLoanAccountDetails(
  accountnumber: string,
  action: string
): GetLoanAccountDetailsResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetLoanAccountDetailsResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoans, decryptData(accountnumber)],
    queryFn: () =>
      getLoanAccountDetails(
        toastActions,
        decryptData(accountnumber) as string,
        decryptData(action) as string
      ),
    enabled: Boolean(
      accountnumber.toString().length > 0 && action.toString().length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export async function getAllLoans(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;
  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/loan/search/loandirectory?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchResultsGenericResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          branch: params?.branchID,
          status: params?.status,
          customerId: params?.customerID,
          fullName: params?.fullName
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
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllLoans(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as SearchResultsGenericResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getAllLoans,
      params?.branchID || '',
      params?.customerID || '',
      params?.status || '',
      params?.fullName || '',
      params?.page || 1
    ],
    queryFn: () => getAllLoans(toastActions, params),
    enabled: Boolean(
      (params?.status?.toString() || '').length > 0 ||
        (params?.branchID || '').length > 0 ||
        (params?.fullName || '').length > 0 ||
        (params?.customerID || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

//  create loan underwrite
async function createLoanUnderWriting(
  toastActions: IToastActions,
  body: LoanUnderwriteInitialValues
): Promise<void> {
  try {
    const urlEndpoint = '/CreditManagement/CreateLoanUnderwriting';
    const { data }: AxiosResponse<createLoanUnderWritingResponse> =
      await axiosInstance({
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

export function useCreatLoanUnderwriting() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: LoanUnderwriteInitialValues) =>
      createLoanUnderWriting(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllLoans]
      });
      handleRedirect(router, '/loan/loan-directory/');
    },
    onError: () => {
      // Do nothing on error, preventing handleRedirect from running
    }
  });
  return { mutate, isPending, isError, error };
}
export async function closeLoan(
  toastActions: IToastActions,
  body: CancelLoanValues
): Promise<void> {
  try {
    const urlEndpoint = '/CreditManagement/CloseLoan';
    const { data }: AxiosResponse<GetLoanAccountDetailsResponse> =
      await axiosInstance({
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

export function useCloseLoan() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CancelLoanValues) => closeLoan(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllLoans]
      });
      handleRedirect(router, '/loan/loan-directory/');
    },
    onError: () => {
      // Do nothing on error, preventing handleRedirect from running
    }
  });

  return { mutate, isPending, isError, error };
}

export async function writeOffLoan(
  toastActions: IToastActions,
  body: ISetTerminateLoanValues
): Promise<void> {
  try {
    const urlEndpoint = '/CreditManagement/WriteOffLoan';
    const { data }: AxiosResponse<GetLoanAccountDetailsResponse> =
      await axiosInstance({
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

export function useWriteOffLoan() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: ISetTerminateLoanValues) =>
      writeOffLoan(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllLoans]
      });
      handleRedirect(router, '/loan/loan-directory/');
    }
  });
  return { mutate, isPending, isError, error };
}

export async function partialPayOffLoan(
  toastActions: IToastActions,
  body: SetPartialPayOffValues
): Promise<void> {
  try {
    const urlEndpoint = '/CreditManagement/PartialPayOff';
    const { data }: AxiosResponse<GetLoanAccountDetailsResponse> =
      await axiosInstance({
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

export function usePartialPayOfflLoan() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: SetPartialPayOffValues) =>
      partialPayOffLoan(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllLoans]
      });
      handleRedirect(router, '/loan/loan-directory/');
    }
  });
  return { mutate, isPending, isError, error };
}

// restructured loan
export async function restructurelLoan(
  toastActions: IToastActions,
  body: RestructureLoanValues
): Promise<void> {
  try {
    const urlEndpoint = '/CreditManagement/LoanRestructure';
    const { data }: AxiosResponse<GetLoanAccountDetailsResponse> =
      await axiosInstance({
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

export function useRestructureLoan() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: RestructureLoanValues) =>
      restructurelLoan(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllLoans]
      });
      handleRedirect(router, '/loan/loan-directory/');
    },
    onError: () => {
      // Do nothing on error, preventing handleRedirect from running
    }
  });
  return { mutate, isPending, isError, error };
}

export async function disburseLoan(
  toastActions: IToastActions,
  body: disburseLoanvalues
): Promise<void> {
  try {
    const urlEndpoint = '/CreditManagement/LoanDisbursement';
    const { data }: AxiosResponse<GetLoanDisbursementResponse> =
      await axiosInstance({
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
    toast(message, title, severity, toastActions); // TODO: Revert this once the response is fixed
    throw errorResponse;
  }
}

export function useDisburseLoan() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: disburseLoanvalues) => disburseLoan(toastActions, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllLoans]
      });
      handleRedirect(router, '/loan/loan-directory/');
    },
    onError: () => {
      // Do nothing on error, preventing handleRedirect from running
      handleRedirect(router, '/loan/loan-directory/'); // remove this once the response is fixed
    }
  });

  return { mutate, isPending, isError, error };
}

async function getAllLoansProduct(
  toastActions: IToastActions
): Promise<AllLoanProductsResponse> {
  let result: AllLoanProductsResponse = {} as AllLoanProductsResponse;
  try {
    const urlEndpoint = '/General/Product/GetAllLoanProduct';
    const { data }: AxiosResponse<AllLoanProductsResponse> =
      await axiosInstance({
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
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllLoansProduct() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as AllLoanProductsResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoansProduct],
    queryFn: () => getAllLoansProduct(toastActions)
  });

  return { ...data, isError, isLoading };
}

export async function getLoanProductDetailByProductCode(
  code: string,
  toastActions: IToastActions
): Promise<ProductLoanDetails> {
  let result: ProductLoanDetails = {} as ProductLoanDetails;
  try {
    const urlEndpoint = `/General/Product/GetLoanProductByPcode?productCode=${decryptData(code) as string}`;
    const { data }: AxiosResponse<ProductLoanDetails> = await axiosInstance({
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

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetLoansProductDetailCode(code: string) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ProductLoanDetails;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getLoansProductDetailCode],
    queryFn: () => getLoanProductDetailByProductCode(code, toastActions)
  });
  return { ...data, isError, isLoading };
}

async function getAllLoansPurpose(
  toastActions: IToastActions
): Promise<ProductLoanPurpose> {
  let result: ProductLoanPurpose = {} as ProductLoanPurpose;
  try {
    const urlEndpoint = '/General/LoanPurpose/GetAllLoanPurpose';
    const { data }: AxiosResponse<ProductLoanPurpose> = await axiosInstance({
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
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllLoansPurpose() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ProductLoanPurpose;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoansPurpose],
    queryFn: () => getAllLoansPurpose(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function getAllLoanRepaymentTypes(
  toastActions: IToastActions
): Promise<productLoanRepayment> {
  let result: productLoanRepayment = {} as productLoanRepayment;
  try {
    const urlEndpoint = '/General/Product/GetRepaymentType';
    const { data }: AxiosResponse<productLoanRepayment> = await axiosInstance({
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
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllLoanRepaymentTypes() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as productLoanRepayment;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoanRepaymentTypes],
    queryFn: () => getAllLoanRepaymentTypes(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function getAllLoanSources(
  toastActions: IToastActions
): Promise<ILoanSources> {
  let result: ILoanSources = {} as ILoanSources;
  try {
    const urlEndpoint = '/General/LoanSource/GetAllLoanSource';
    const { data }: AxiosResponse<ILoanSources> = await axiosInstance({
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
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllLoanSources() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ILoanSources;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoansources],
    queryFn: () => getAllLoanSources(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function getAllLoanCollaterals(
  toastActions: IToastActions
): Promise<ILoanCollaterals> {
  let result: ILoanCollaterals = {} as ILoanCollaterals;
  try {
    const urlEndpoint = '/General/Collateral/GetCollateral';
    const { data }: AxiosResponse<ILoanCollaterals> = await axiosInstance({
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
    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllLoanCollaterals() {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as ILoanCollaterals;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoanCollaterals],
    queryFn: () => getAllLoanCollaterals(toastActions)
  });

  return { ...data, isError, isLoading };
}

async function getLoanAccountByCustomerId(
  toastActions: IToastActions,
  customerId: string
): Promise<GetCustomerLoanAcct> {
  let result: GetCustomerLoanAcct = {
    responseCode: '',
    responseMessage: '',
    data: {
      accountnumber: ''
    }
  };

  try {
    const urlEndpoint = `/CreditManagement/GetLoanAcctbyCustID?custID=${customerId}`;

    const { data }: AxiosResponse<GetCustomerLoanAcct> = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useGetLoanAccountByCustomerId(
  customerId: string
): GetLoanAccountDetailsResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetLoanAccountDetailsResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoans, decryptData(customerId)],
    queryFn: () =>
      getLoanAccountByCustomerId(
        toastActions,
        decryptData(customerId) as string
      ),
    enabled: Boolean(customerId.toString().length > 0)
  });

  return { ...data, isError, isLoading };
}

async function getLoanAccountByLoanAccountNumber(
  toastActions: IToastActions,
  loanAccount: string,
  status: string
): Promise<GetLoanByAccountDetailsResponse> {
  let result: GetLoanByAccountDetailsResponse = {
    responseCode: '',
    responseMessage: '',
    loanAccDetails: {} as LoanAccountDetailPreview
  };

  try {
    const urlEndpoint = `/creditmanagement/GetloanAccDetails?accountnumber=${loanAccount}&action=${status}`;

    const { data }: AxiosResponse<GetLoanByAccountDetailsResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useGetLoanAccountByLoanAccountNumber(
  loanAccount: string,
  status: string
): GetLoanByAccountDetailsResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {} as GetLoanByAccountDetailsResponse;

  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getAllLoans, decryptData(loanAccount)],
    queryFn: () =>
      getLoanAccountByLoanAccountNumber(
        toastActions,
        decryptData(loanAccount) as string,
        decryptData(status) as string
      ),
    enabled: Boolean(loanAccount.toString().length > 0)
  });

  return { ...data, isError, isLoading };
}

async function getNextApplicationNo(
  toastActions: IToastActions
): Promise<{ nextAppNo: string }> {
  let result = { nextAppNo: '' };

  try {
    const urlEndpoint = '/CreditManagement/GetNextApplicationNo';

    const { data } = await axiosInstance({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getStoredUser()?.token}`
      }
    });

    result = data;
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }

  return result;
}

export function useGetNextApplicationNo(): {
  nextAppNo: string;
  isError: boolean;
  isLoading: boolean;
} {
  const toastActions = useContext(ToastMessageContext);
  const fallback = { nextAppNo: '', isError: false, isLoading: false };
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getNextApplicationNo],
    queryFn: () => getNextApplicationNo(toastActions),
    enabled: true
  });

  return { ...data, isError, isLoading };
}

// loan overdraft section
export async function getAllOverdraft(
  toastActions: IToastActions,
  params: ISearchParams | null
): Promise<any> {
  let result: SearchResultsGenericResponse = {} as SearchResultsGenericResponse;
  try {
    const urlEndpoint = `${SEARCH_BASE_URL}/loan/search/overdrafts?page=${params?.page}&size=10`;
    const { data }: AxiosResponse<SearchResultsGenericResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: {
          branch: params?.branchID,
          customerId: params?.customerID
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
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetAllOverdraft(params: ISearchParams | null) {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {
    responseCode: '',
    responseDescription: '',
    data: []
  } as SearchResultsGenericResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [
      queryKeys.getAllOverdraft,
      params?.branchID || '',
      params?.customerID || '',
      params?.page || 1
    ],
    queryFn: () => getAllOverdraft(toastActions, params),
    enabled: Boolean(
      (params?.customerID?.toString() || '').length > 0 ||
        (params?.branchID || '').length > 0
    )
  });

  return { ...data, isError, isLoading };
}

export async function setOverdraft(
  toastActions: IToastActions,
  body: typeof setOverdraftInitialValues,
  actionType: string
): Promise<void> {
  try {
    let urlEndpoint = '';
    switch (actionType) {
      case 'set':
        urlEndpoint = '/CreditManagement/CreateOverdraft';
        break;
      case 'update':
        urlEndpoint = `/CreditManagement/UpdateOverdraft?accountnumber=${body?.accountNumber}&odno=${body.odNumber}`;
        break;
      default:
        return;
    }

    let method: 'POST' | 'PUT';

    if (actionType === 'update') {
      method = 'PUT';
    } else {
      method = 'POST';
    }

    const { data }: AxiosResponse<GetLoanAccountDetailsResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method,
        data: { ...body },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    if (!SUCCESS_CODES.includes(data.responseCode as string)) {
      throw new Error(message);
    }
  } catch (error) {
    const { message, title, severity } = globalErrorHandler({}, error);
    toast(message, title, severity, toastActions);
    throw error;
  }
}

export function useSetOverdraft(actionType: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: SetOverdraftInitialValues) =>
      setOverdraft(toastActions, body, actionType),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterCustomerSearch],
        [queryKeys.getAccountDetails]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/loan/overdrafts/');
    }
  });
  return { mutate, isPending, isError, error };
}

export async function getOverdraftDetails(
  toastActions: IToastActions,
  accountNumber: string
): Promise<GetOverdraftDetailResponse> {
  let result: GetOverdraftDetailResponse = {
    responseCode: '',
    responseDescription: '',
    odAccDetails: {
      accountNumber: '',
      fullName: '',
      faclityType: '',
      tenor: '',
      interestFrequency: '',
      amount: '',
      interestRate: '',
      penalRate: '',
      interestAmount: '',
      effective_dt: '',
      expiryDate: '',
      status: '',
      reportDate: ''
    }
  };
  try {
    const urlEndpoint = `/CreditManagement/GetOverdraftAcctDetails?accountnumber=${accountNumber}`;
    const { data }: AxiosResponse<GetOverdraftDetailResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    if (data && data.responseCode) {
      result = data;
    }

    const { message, title, severity } = globalErrorHandler(result);
    toast(message, title, severity, toastActions);
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
  return result;
}

export function useGetOverdraftDetails(
  accountnumber: string
): GetOverdraftDetailResponse {
  const toastActions = useContext(ToastMessageContext);
  const fallback = {
    responseCode: '',
    responseDescription: '',
    odAccDetails: {}
  } as GetOverdraftDetailResponse;
  const {
    data = fallback,
    isError,
    isLoading
  } = useQuery({
    queryKey: [queryKeys.getOverdraftDetail],
    queryFn: () =>
      getOverdraftDetails(toastActions, decryptData(accountnumber) as string),
    staleTime: 0
  });

  return { ...data, isError, isLoading };
}

export async function terminateOverdraft(
  toastActions: IToastActions,
  body: typeof setOverdraftInitialValues
): Promise<void> {
  try {
    const urlEndpoint = `/CreditManagement/TerminateOverdraft?accountnumber=${body?.accountNumber}&OdNumber=${body.odNumber}`;

    const { data }: AxiosResponse<GetLoanAccountDetailsResponse> =
      await axiosInstance({
        url: urlEndpoint,
        method: 'DELETE',
        data: { ...body },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getStoredUser()?.token}`
        }
      });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);

    if (!SUCCESS_CODES.includes(data.responseCode as string)) {
      throw new Error(message);
    }
  } catch (error) {
    const { message, title, severity } = globalErrorHandler({}, error);
    toast(message, title, severity, toastActions);
    throw error;
  }
}

export function useTerminateOverdraft() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toastActions = useContext(ToastMessageContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: SetOverdraftInitialValues) =>
      terminateOverdraft(toastActions, body),
    onSuccess: () => {
      const keysToInvalidate = [
        [queryKeys.filterCustomerSearch],
        [queryKeys.getAccountDetails]
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      handleRedirect(router, '/loan/overdrafts/');
    }
  });
  return { mutate, isPending, isError, error };
}
