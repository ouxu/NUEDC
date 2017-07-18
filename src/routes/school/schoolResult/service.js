/**
 * Created by Pororo on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchResultTable = async (data) => request({
  url: API.schoolResult,
  method: 'get',
  token: true,
  data
})

const fetchSelectOption = async () => request({
  url: API.schoolAcquireId,
  method: 'get',
  token: true
})

const resultExcelOut = async ({filename}, id) => request({
  url: API.schoolResultExcelOut + id,
  method: 'export',
  token: true,
  filename
})

export { fetchResultTable, resultExcelOut, fetchSelectOption }
