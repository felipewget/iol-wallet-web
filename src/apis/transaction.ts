import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./api-client";

export const transferIol = (transaction: any) => {
    return apiClient.post<any>(`/transactions/iol`, transaction);
}

export const createDomain = (transaction: any) => {
    return apiClient.post<any>(`/transactions/domain`, transaction);
}

export const updateDomain = (transaction: any) => {
    return apiClient.put<any>(`/transactions/domain`, transaction);
}

export const transferDomain = (transaction: any) => {
    return apiClient.put<any>(`/transactions/domain/transfer`, transaction);
}

export const createData = (transaction: any) => {
    return apiClient.post<any>(`/transactions/data`, transaction);
}

export const updateData = (transaction: any) => {
    return apiClient.put<any>(`/transactions/data`, transaction);
}

export const transferData = (transaction: any) => {
    return apiClient.put<any>(`/transactions/data/transfer`, transaction);
}

export const createProduct = (transaction: any) => {
    return apiClient.post<any>(`/transactions/product`, transaction);
}

export const deleteProduct = (transaction: any) => {
    return apiClient.delete<any>(`/transactions/product`, {
        data: transaction
    });
}

export const executeOrder = (transaction: any) => {
    return apiClient.post<any>(`/transactions/order`, transaction);
}

export const createAlias = (transaction: any) => {
    return apiClient.post<any>(`/transactions/alias`, transaction);
}

export const useCreateDataQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['create-data'], async (transaction: any) => {
    const { data } = await createData(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useUpdateDataQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['update-data'], async (transaction: any) => {
    const { data } = await updateData(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useTransferDataQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['transfer-data'], async (transaction: any) => {
    const { data } = await transferData(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useCreateProductQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['create-product'], async (transaction: any) => {
    const { data } = await createProduct(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useDeleteProductQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['delete-product'], async (transaction: any) => {
    const { data } = await deleteProduct(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useExecuteOrderQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['execute-order'], async (transaction: any) => {
    const { data } = await executeOrder(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useCreateAliasQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['create-alias'], async (transaction: any) => {
    const { data } = await createAlias(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useTransferQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['send-transaction'], async (transaction: any) => {
    const { data } = await transferIol(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useCreateDomainQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['create-domain'], async (transaction: any) => {
    const { data } = await createDomain(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useUpdateDomainQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['update-domain'], async (transaction: any) => {
    const { data } = await updateDomain(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};

export const useTransferDomainQuery = (onSuccess: (e:any) => void, onError: (e:any) => void) => {
  return useMutation(['transfer-domain'], async (transaction: any) => {
    const { data } = await transferDomain(transaction);

    return data;
  },{
    onSuccess,
    onError
  });
};