
/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchSignUpTable = async (data) => request({
  url: API.getContestProblemList,
  method: 'get',
  token: true
})
const signUpContest = async (data) => request({
  url: API.signUpContest,
  method: 'post',
  token: true,
  data
})
export {signUpContest, fetchSignUpTable }