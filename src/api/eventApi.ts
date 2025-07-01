import { axiosRequest } from "../helpers/axios/axiosBaseQuery"


// CREATE
export async function createEvent(data: any) {
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

// READ all
export async function getMyEvents(params?: any) {
  return axiosRequest({
    url: '/events/my-event',
    method: 'GET',
    params,
  })
}

// UPDATE
export async function updateEvent(id: string | number, data: any) {
  return axiosRequest({
    url: `/events/${id}`,
    method: 'PATCH',
    data,
  })
}

// DELETE
export async function deleteEvent(id: string | number) {
  return axiosRequest({
    url: `/events/${id}`,
    method: 'DELETE',
  })
}
