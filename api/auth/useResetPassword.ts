import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { APIResponse } from '../RequestTypes/CommonTypes';
import { ResetPasswordPayload } from '../RequestTypes/admin';
import { UseResetpasswordResponse } from '../ResponseTypes/admin';
import { IToastActions } from '@/constants/types';
import { axiosInstance } from '@/axiosInstance';
import { getStoredUser } from '@/utils/user-storage';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { queryKeys } from '@/react-query/constants';

async function changePassword(
  toastActions: IToastActions,
  body: ResetPasswordPayload
): Promise<UseResetpasswordResponse> {
  let result: UseResetpasswordResponse = {
    responseCode: '',
    responseDescription: '',
    token: null,
    fullName: null,
    tokenExpire: null,
    profiles: {
      userid: null,
      sys_date: '',
      roleid: null,
      rolelevel: null,
      dmb: null,
      menuid: null,
      menulevel: null
    },
    menuItems: null
  };
  try {
    const urlEndpoint = '/Login/ChangePassword';
    const { data }: AxiosResponse<APIResponse> = await axiosInstance({
      url: urlEndpoint,
      method: 'POST',
      data: { ...body },
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

export function useResetPassword(payload: ResetPasswordPayload) {
  const toastActions = useContext(ToastMessageContext);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [queryKeys.resetPassword, payload],
    queryFn: () => changePassword(toastActions, payload),
    enabled: Boolean(payload?.oldpassword.length > 3)
  });

  return { data, isError, isLoading, isSuccess };
}
