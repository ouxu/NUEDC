import { API, request } from '../utils'

export const login = async (data) => {
  return request({
    url: API.login,
    method: 'post',
    data
  })
}