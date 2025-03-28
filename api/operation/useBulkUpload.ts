import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { APIResponse } from '@/api/RequestTypes/CommonTypes';
import { queryKeys } from '@/react-query/constants';
import { IToastActions } from '@/constants/types';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { CreateBulkUploadFormValues } from '@/schemas/schema-values/operation';
import { useRouter } from 'next/navigation';
import { handleRedirect } from '@/utils';

async function createBulkUpload(
  toastActions: IToastActions,
  body: CreateBulkUploadFormValues
): Promise<void> {
  try {
    const urlEndpoint = `/Operations/Operations/GetBulkTemplate`;
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body },
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getStoredUser()?.token}`,
        Accept: 'application/json'
      }
    });

    const { message, title, severity } = globalErrorHandler(data);
    toast(message, title, severity, toastActions);
  } catch (errorResponse) {
    const { message, title, severity } = globalErrorHandler({}, errorResponse);
    toast(message, title, severity, toastActions);
  }
}
export function useCreateBulkUpload() {
  const router = useRouter();
  const toastActions = useContext(ToastMessageContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: CreateBulkUploadFormValues) =>
      createBulkUpload(toastActions, body),
    onSuccess: () => {
      handleRedirect(router, '/operation/cash/');
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
