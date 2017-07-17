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
  joinedTeams: apiMaker('school/team/info?contest_id=1'),
  addTeam: apiMaker('school/team/add'),
  schoolResult: apiMaker('school/team/awards?contest_id=1'),
  updateTeamInfo: apiMaker('/school/team/update/'),
  deleteTeam: apiMaker('school/team/delete/'),
  checkTeam: apiMaker('school/team/check/'),
  joinedExcelOut: apiMaker('school/admin/team/export?contest_id='),
  acquireId: apiMaker('school/admin/contest'),

  // admin
  adminLogin: apiMaker('sysadmin/login'),
  adminContestCreate: apiMaker('sysadmin/contest/create'),
  adminContestUpdate: apiMaker('sysadmin/contest/:id/update'),
  adminContestDelete: apiMaker('sysadmin/contest/:id/delete'),
}
