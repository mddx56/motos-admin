import { api } from './api'
import { AxiosResponse } from 'axios'
import { ClientCreate, ClientData } from '@/types/client.type'
import { ResponseApi } from '@/types/response.type'

export const getAllClientsFn = async (): Promise<
  AxiosResponse<ResponseApi<ClientData[]>, any>
> => {
  return await api.get<ResponseApi<ClientData[]>>('client')
}

export const getClientFn = async (id: string) => {
  const response = await api.get<ClientData>(`client/${id}`)
  return response.data
}

export const createClientFn = async (formData: ClientCreate) => {
  const response = await api.post<ClientData>(`client`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const updateClientFn = async ({
  id,
  formData,
}: {
  id: number
  formData: FormData
}) => {
  const response = await api.put<ClientData>(`client/${id}`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const deleteClientFn = async (id: number) => {
  const response = await api.delete<ClientData>(`client/${id}`)
  return response.data
}
