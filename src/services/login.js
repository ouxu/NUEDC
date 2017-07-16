import { API, request } from '../utils'

const login = async data => request({
  url: API.login,
  method: 'post',
  data
})

const register = async data => request({
  url: API.register,
  method: 'post',
  data
})

const getCode = async data => request({
  url: API.preRegister,
  method: 'get',
  data
})
export { login, register, getCode }