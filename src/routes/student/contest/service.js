/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.getAllContest,
  method: 'get',
  token: true
})

const fetchTablePass = async (data) => request({
  url: API.getAllPassContest,
  method: 'get',
  token: true
})

export { fetchTable, fetchTablePass }