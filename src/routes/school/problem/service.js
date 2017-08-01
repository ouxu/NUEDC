/**
 * Created by out_xu on 17/8/1.
 */
import { API, request } from '../../../utils'

const fetchSelectOption = async () => request({
  url: API.schoolAcquireId,
  method: 'get',
  token: true
})

const fetchTable = async (data) => request({
  url: API.schoolProblem,
  method: 'get',
  token: true,
  data
})

const update = async (data) => request({
  url: API.schoolProblemUpdate,
  method: 'put',
  token: true,
  data: data
})

const getInfo = async (data) => request({
  url: API.schoolProblemCheck,
  method: 'get',
  token: true,
  data: data
})

export { fetchSelectOption, fetchTable, update, getInfo }