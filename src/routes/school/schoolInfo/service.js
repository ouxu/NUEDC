/**
 * Created by Pororo on 17/7/17.
 */
import { API, request } from '../../../utils'

const fetchInfo = async () => request({
  url: API.schoolResult,
  method: 'get',
  token: true
})

const changeInfo = async (data) => request({
  url: API.joinedExcelOut + data,
  method: 'get',
  token: true
})

export { fetchInfo, changeInfo }
