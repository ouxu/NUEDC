import axios from 'axios'
import { message } from 'antd'
import { codeHelper } from './'
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
  try {
    const timer = await setTimeout(() => {
      return {
        code: '-1'
      }
    }, TIMEOUT)

    const res = await fetch(options)
    clearTimeout(timer)
    const {data} = res
    if (data.code !== 0) {
      return data
    } else {
      codeHelper(data.code)
      return data
    }
  } catch (e) {
    message.error('网络错误，请刷新页面重试')
    return {
      code: -1
    }
  }
}
