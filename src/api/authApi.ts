import { axiosRequest } from "../helpers/axios/axiosBaseQuery"


// CREATE
export async function signup(data: any) {
  return axiosRequest({
    url: '/auth/signup',
    method: 'POST',
    data,
  })
}
export async function login(data: any) {
  return axiosRequest({
    url: '/auth/login',
    method: 'POST',
    data,
  })
}

// READ single
export async function getLoggedUser() {
  return axiosRequest({
    url: `/users/my-profile`,
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
