import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export const getTransaction = (account:string) => {
    return apiClient.get<any>(`transactions/uid/${account}`);
}

export const getTransactionQuery = (account:string, onSuccess: (response:any) => void, onError: (response:any) => void) => {
    return useQuery(['get-transaction', account], async () => {
        const { data } = await getTransaction(account);

        return data.data;
    }, {
        onSuccess,
        onError,
        retry: false,
        enabled: false,
    });
}