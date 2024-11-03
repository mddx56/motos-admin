export type ClientData = {
  id: string
  ci: string
  fullname: string
  address: string
  phone: string
  created_at: Date
  update_at: Date
}

export type ClientCreate = {
  ci: string
  fullname: string
  address?: string
  phone?: string
}
