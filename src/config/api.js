import config from './app.json'

const {baseURL} = config

const apiMaker = path => `${baseURL}/${path}`

export default {

  host: apiMaker(''),
  changePassword: apiMaker('user/updatePassword'),
  // student
  login: apiMaker('user/login'),
  logout: apiMaker('user/logout'),
  tokenVerify: apiMaker('verify-token'),
  register: apiMaker('user/register'),
  getResult: apiMaker('user/:contestId/getResult'),
  preRegister: apiMaker('user/preRegister'),
  deleteCompetition: apiMaker(''),
  signUpContest: apiMaker('user/signUpContest'),
  getAllContest: apiMaker('user/getAllContest'),
  getContestProblemList: apiMaker('user/:id/getContestProblemList'),
  // getContestProblemList: apiMaker('user/3/getContestProblemList'),
  getContestProblemDetail: apiMaker('user/getContestProblemDetail'),
  updateContestProblemSelect: apiMaker('user/updateContestProblemSelect'),
  getContestSignUpStatus: apiMaker('user/:contestId/getContestSignUpStatus'),
  abandonContest: apiMaker('user/:contestId/abandonContest'),
  getAllPassContest: apiMaker('user/getAllPassContest'),
  userSchools: apiMaker('user/schools'),

  // school
  schoolLogin: apiMaker('school/admin/login'),
  schoolJoinedTeams: apiMaker('school/team/info'),
  schoolAddTeam: apiMaker('school/team/add'),
  schoolResult: apiMaker('school/team/awards'),
  schoolUpdateTeamInfo: apiMaker('/school/team/update/'),
  schoolDeleteTeam: apiMaker('school/team/delete/'),
  schoolCheckTeam: apiMaker('school/team/check/'),
  schoolJoinedExcelOut: apiMaker('school/admin/team/export?'),
  schoolResultExcelOut: apiMaker('school/admin/result/export?'),
  schoolAcquireId: apiMaker('school/admin/contest'),
  schoolChecked: apiMaker('school/team/mult-check'),
  schoolImportTeamsExcel: apiMaker('school/admin/team/getImportTemplate'),
  schoolUploadExcel: apiMaker('school/admin/team/import'),

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

  adminSchoolAdmins: apiMaker('sysadmin/school-admins'),
  adminSchoolAdminCreate: apiMaker('sysadmin/school-admin/create'),
  adminUserUpdate: apiMaker('sysadmin/user/:id/update'),
  adminUserDelete: apiMaker('sysadmin/user/:id/delete'),

  adminContestRecords: apiMaker('sysadmin/contest-records'),
  adminContestRecordUpdate: apiMaker('sysadmin/contest-records/:id/update'),
  adminContestRecordDelete: apiMaker('sysadmin/contest-records/:id/delete'),
  adminContestRecordExcel: apiMaker('sysadmin/contest-record/export'),
  adminResultsUpdate: apiMaker('sysadmin/results/update'),

  adminProblems: apiMaker('sysadmin/problem/info'),

  adminMessage: apiMaker('sysadmin/message/all'),
  // news
  newsMessageAll: apiMaker('sysadmin/message/all'),
  newsPassage: apiMaker('sysadmin/message/info'),
  newsUpdate: apiMaker('sysadmin/message/update/:id'),
  newsCreate: apiMaker('sysadmin/message/add'),
}
