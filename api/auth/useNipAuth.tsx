import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import axiosRetry from 'axios-retry';
import { nipAxiosInstance } from '@/axiosInstance';
import { NipLoginResponse, NipLoginValue } from '@/schemas/schema-values/auth';

axiosRetry(nipAxiosInstance, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: any) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error),
});

const nipAuth = async (body: NipLoginValue): Promise<NipLoginResponse> => {
  const urlEndpoint = 'tenants/login';
  const response: AxiosResponse<NipLoginResponse> = await nipAxiosInstance.post(
    urlEndpoint,
    body,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

export function useNipAuth() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (body: NipLoginValue) => nipAuth(body)
  });

  return {
    mutate,
    isPending,
    isError,
    error
  };
}
