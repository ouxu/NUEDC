import axios from 'axios'
import { getToken } from './'
const TIMEOUT = 15000

const fetch = options => {
  let {
    method = 'get',
    data,
    url
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data
      })
    case 'delete':
      return axios.delete(url, {
        data: data
      })
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}
export default async options => {
  const timer = await setTimeout(() => {
    return {
      code: '-1'
    }
  }, TIMEOUT)

  const res = await fetch(options)
  clearTimeout(timer)
  const {data} = res

  return data
}
