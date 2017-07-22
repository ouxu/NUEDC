/**
 * Created by out_xu on 17/7/14.
 */
/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'
const signUpContest = async (data, id) => request({
  url: API.signUpContest,
  method: 'post',
  token: true,
  data
})
const getAllContest = async (data) => request({
  url: API.getAllContest,
  method: 'get',
  token: true
})
const getContestProblemList = async (id) => request({
  url: API.getContestProblemList.replace(':contestId', id),
  // url: API.getContestProblemList.replace(':contestId', 3),
  method: 'get',
  token: true
})
/**
 * @query contestId
 * @query problemId
 */
const getContestProblemDetail = async (data) => request({
  url: API.getContestProblemDetail + data,
  method: 'get',
  token: true
})
/**
 * @query contestId
 * @query problemId
 */
const updateContestProblemSelect = async (data) => request({
  url: API.updateContestProblemSelect + data,
  method: 'get',
  token: true
})
const getContestSignUpStatus = async (contestId) => request({
  url: API.adminContestUpdate.replace(':contestId', contestId),
  method: 'get',
  token: true
})
const abandonContest = async (contestId) => request({
  url: API.abandonContest.replace(':contestId', contestId),
  method: 'get',
  token: true
})
const getAllPassContest = async () => request({
  url: API.getAllContest,
  method: 'get',
  token: false
})
const getSchoolList = async () => request({
  url: API.getSchoolList,
  method: 'get',
  token: false
})

export { getContestProblemDetail, getContestProblemList}