import { useQuery } from '@tanstack/react-query';
import {apiClient} from './api-client';

export const getBalance = async (account: string) => {
    return apiClient.get<any>(`/accounts/${account}/balance`);
}

export const getDomains  = async (account: string) => {
    return apiClient.get<any>(`/accounts/${account}/domains`);
}

export const getTransactions  = async (account: string) => {
    return apiClient.get<any>(`/accounts/${account}/transactions`);
}

export const useGetBalanceQuery = (account: string) => {
  return useQuery(['get-balance', account], async () => {
    const { data } = await getBalance(account);

    return data;
  }, {
    enabled: false,
  });
};

export const useGeDomainsQuery = (account: string) => {
  return useQuery(['list-domains', account], async () => {
    const { data } = await getDomains(account);

    return data;
  }, {
    enabled: false,
  });
};

export const useTransactionsQuery = (account: string) => {
  return useQuery(['list-transactions', account], async () => {
    const { data } = await getTransactions(account);

    return data;
  });
};

