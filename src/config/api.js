import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  // student
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  tokenVerify: apiMaker('verify-token'),
  register: apiMaker('user/register'),
  preRegister: apiMaker('user/preRegister'),
  deleteCompetition: apiMaker(''),

  // school
  schoolLogin: apiMaker('school/admin/login'),
  schoolJoinedTeams: apiMaker('school/team/info?contest_id=1'),
  schoolAddTeam: apiMaker('school/team/add'),
  schoolResult: apiMaker('school/team/awards?contest_id=1'),
  schoolUpdateTeamInfo: apiMaker('/school/team/update/'),
  schoolDeleteTeam: apiMaker('school/team/delete/'),
  schoolCheckTeam: apiMaker('school/team/check/'),
  schoolJoinedExcelOut: apiMaker('school/admin/team/export?contest_id='),
  schoolResultExcelOut: apiMaker('school/admin/result/export?contest_id='),
  schoolAcquireId: apiMaker('school/admin/contest'),

  // admin
  adminLogin: apiMaker('sysadmin/login'),

  adminContests: apiMaker('sysadmin/contests'),
  adminContestCreate: apiMaker('sysadmin/contest/create'),
  adminContestUpdate: apiMaker('sysadmin/contest/:id/update'),
  adminContestDelete: apiMaker('sysadmin/contest/:id/delete'),

  adminSchools: apiMaker('sysadmin/schools'),
  adminSchoolCreate: apiMaker('sysadmin/school/create'),
  adminSchoolUpdate: apiMaker('sysadmin/school/:id/update'),
  adminSchoolDelete: apiMaker('sysadmin/school/:id/delete'),

}
