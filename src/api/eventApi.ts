import { axiosRequest } from "../helpers/axios/axiosBaseQuery"


// CREATE
export async function createItem(data: any) {
  return axiosRequest({
    url: '/events',
    method: 'POST',
    data,
  })
}

// READ single
export async function getItem(id: string | number) {
  return axiosRequest({
    url: `/events/${id}`,
    method: 'GET',
  })
}

// READ all
export async function getEvents(params?: any) {
  return axiosRequest({
    url: '/events',
    method: 'GET',
    params,
  })
}

// UPDATE
export async function updateItem(id: string | number, data: any) {
  return axiosRequest({
    url: `/events/${id}`,
    method: 'PUT',
    data,
  })
}

// DELETE
export async function deleteItem(id: string | number) {
  return axiosRequest({
    url: `/events/${id}`,
    method: 'DELETE',
  })
}
