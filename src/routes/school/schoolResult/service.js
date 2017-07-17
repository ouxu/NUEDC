/**
 * Created by Pororo on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchResultTable = async (data) => request({
  url: API.schoolResult.replace('1', `${data}`),
  method: 'get',
  token: true
})

const fetchSelectOption = async () => request({
  url: API.schoolAcquireId,
  method: 'get',
  token: true
})

const resultExcelOut = async (data) => request({
  url: API.schoolResultExcelOut + data,
  method: 'get',
  token: true
})

export { fetchResultTable, resultExcelOut, fetchSelectOption }
