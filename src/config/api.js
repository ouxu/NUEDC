import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  tokenVerify: apiMaker('token-verify'),
  register: apiMaker('user/register'),


  deleteCompetition: apiMaker(''),
  contestsMine: apiMaker('contests/mine'),

  news: apiMaker('news')
}
