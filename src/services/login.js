import { API, request } from '../utils'

const login = async (data, role) => {
  let url = API.login
  if (role === 'admin') {
    url = API.adminLogin
  }
  if (role === 'school') {
    url = API.schoolLogin
  }
  return request({
    url: url,
    method: 'post',
    data
  })
}

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

const schoolQuery = async () => request({
  url: API.userSchools,
  method: 'get'
})
export { login, register, getCode, schoolQuery }