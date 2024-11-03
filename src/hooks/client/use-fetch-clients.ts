import { getAllClientsFn } from '@/services/client.service'
import { ClientData } from '@/types/client.type'
import { ResponseApi } from '@/types/response.type'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'

export const useFetchClients = (): QueryObserverResult<
  ResponseApi<ClientData[]>,
  any
> => {
  return useQuery<ResponseApi<ClientData[]>, any>({
    queryFn: async () => {
      const { data } = await getAllClientsFn()
      return data
    },
    queryKey: ['clients'],
  })
}
