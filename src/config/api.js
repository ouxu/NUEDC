import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  // student
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  tokenVerify: apiMaker('token-verify'),
  register: apiMaker('user/register'),
  preRegister: apiMaker('user/preRegister'),
  deleteCompetition: apiMaker(''),

  // school
  schoolLogin: apiMaker('school/admin/login'),

  // admin
  adminLogin: apiMaker('sysadmin/login'),
}
