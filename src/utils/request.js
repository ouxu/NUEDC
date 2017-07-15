import axios from 'axios'
import { message } from 'antd'
import { codeHelper } from './'
const TIMEOUT = 15000

const fetch = options => {
  let {
    method = 'get',
    data,
    url,
    token = false
  } = options
  const header = token ? {'token': window.localStorage.getItem('nuedcToken')} : {}
  const myAxios = axios.create({
    timeout: 1000,
    headers: header
  })
  switch (method.toLowerCase()) {
    case 'get':
      return myAxios.get(url, {
        params: data
      })
    case 'delete':
      return myAxios.delete(url, {
        data: data
      })
    case 'post':
      return myAxios.post(url, data)
    case 'put':
      return myAxios.put(url, data)
    case 'patch':
      return myAxios.patch(url, data)
    default:
      return myAxios(options)
  }
}

export default async options => {
  try {
    const res = await fetch(options)
    const {data} = res
    if (data.code === 0) {
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
